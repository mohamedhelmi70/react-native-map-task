import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import MapView, { Marker } from "react-native-maps";
import Modal from 'react-native-modal';

import Icon from '../components/Icon';

import * as Constants from '../constants';

//const Shops = Constants.Mocks.Shops;
const window = Constants.Layout.default.window;
const { Colors, Sizes } = Constants.Theme;
const ASPECT_RATIO = window.width / window.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class  Explorer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      active: null,
      activeModal: null,
      region: null,
      products: {
        icon: "tshirt-v",
        type: 'men’s wear',
        categories: [
          {name: 'Andora Shirt', image: require('../assets/images/ravin/3.jpg') },
          {name: 'Yallow Shirt', image: require('../assets/images/ravin/2.jpg') },
          {name: 'Black Shirt', image: require('../assets/images/ravin/1.jpg') },
        ],
      },
      shops: [],
    }
  }

  componentDidMount = () => {

    this.setState(prevState => ({...prevState, isLoading: true}));
    
    axios.get("https://backend.nasnav.com/navbox/shops?org_id=11")
    .then(res => {

      if ( res.status !== 200 ) {
        throw new Error("Service not available now, try again.");
      }

      shops = res.data.map(shop => ({...shop, ...this.state.products }))
      
      this.setState(prevState => ({
        ...prevState,
        shops,
      }));
    
    })
    .catch(err => {
      this.setState(prevState => ({
        ...prevState,
        error: err,
        isLoading: false,
      }));
    })

    this.getCurrentLocation();
    
    this.setState(prevState => ({...prevState, isLoading: false}));
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(( position ) => {
      const lat = parseFloat(position.coords.latitude)
      const long = parseFloat(position.coords.longitude)

      this.setState(prevState => ({ 
          ...prevState, 
          region: {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        })
      )
    },

    (error) => alert(JSON.stringify(error)),
    
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
  };  

  onGoToShop = ( id ) => {
    this.setState(prevState => ({ ...prevState, activeModal: null, active: null}));
    this.props.navigation.navigate('Shop', { shopId : id });
  };

  renderModal() {
    const { activeModal } = this.state;

    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={Colors.overlay}
        backdropOpacity={.2}
        onBackButtonPress={() => this.setState(prevState => ({ ...prevState, activeModal: null, active: null}))}
        onBackdropPress={() => this.setState(prevState => ({ ...prevState, activeModal: null, active: null}))}
      >
        <View style={styles.modal}>
          
          <View style={styles.modalHeader}>
          
            <View style={{ flex: 2 }}>
              <Text style={[styles.logo]}> 
                Logo
              </Text>
              <Text style={{paddingBottom: -2,}} > 
                { `${activeModal.name}'s ${activeModal.address.city ? activeModal.address.city : activeModal.address.country }` } 
              </Text>
              <Text style={[styles.semiText, { fontSize: 11 } ]} > { activeModal.type } </Text>
            </View>

            <View styles={{ flex: 1 }}>
              <View style={styles.bageLogo} >
                <Text style={{color: Colors.white}}> Logo 360 </Text>
              </View>
            
              <TouchableOpacity style={styles.goToShopBtn} 
                onPress={id => this.onGoToShop(activeModal.id) }
              >
                <Text 
                  style={{ fontSize: 16, color: Colors.tintColor }}
                > 
                  Go to shop 
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalBody}>
            {   
              activeModal.categories.map((category, index) => (
                
                <View key={`category-${index}`} style={[ styles.category, styles.CategoryShadow ]}>

                  <Text style={{ paddingTop: 6, flex: .2, fontSize: 12 }} > { category.name } </Text>
                  
                  <Image style={{ flex: .8, width: 80, height: '100%' }} source={category.image} />
                
                </View>
              
              ))
            }
          </View>
        </View>     
      </Modal>
    );
  }

  renderIcon = ( name , id ) => (
    <Icon 
      type="MaterialCommunityIcons"
      name={ name }
      size={32}
      color={ this.state.active === id ? Colors.white : Colors.tintColor }
    />
  );

  render () {
    
    let map = null;

    if ( !this.state.isLoading && this.state.region ) {
      map = (
        <MapView initialRegion={this.state.region}  style={styles.mapStyle}  >

          <Marker coordinate={this.state.region} />
          
          {this.state.shops.map(shop => { 
            return Platform.OS === 'ios' ? (
              <Marker
                key={`marker-${shop.id}`}
                coordinate={shop.coordinate}
              >
                <TouchableOpacity onPress={() => this.setState(prevState => ({ ...prevState, activeModal: shop, active : shop.id }))} >
                  
                  <View style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === shop.id ? styles.active : null
                  ]}>

                    { this.renderIcon( shop.icon , shop.id ) }
                  
                  </View>
                
                </TouchableOpacity>
              </Marker>
            ) : (
              <Marker
                key={`marker-${shop.id}`}
                coordinate={{latitude: parseFloat(shop.address.lat), longitude: parseFloat(shop.address.lng)}}
                onPress={() => this.setState(prevState => ({ ...prevState, activeModal: shop, active : shop.id }))}
              >
                <View style={[
                  styles.marker,
                  styles.shadow,
                  this.state.active === shop.id ? styles.active : null
                ]}>

                  { this.renderIcon( shop.icon , shop.id ) }
                
                </View>
              </Marker>
            )
          }
        )}   
        </ MapView>
      )
    } else {
      map = ( <ActivityIndicator size="small" color={Colors.tintColor} /> ); 
    }

    return (
      <View style={styles.container}>
        
        { map }

        { this.renderModal() }
      
      </View>
    );
  }
}

Explorer.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Header
  header: {
    height: window.height * .20,
    backgroundColor: 'transparent',
    zIndex: 10,
    top: 0,
    left: 0,
    width: window.width,
    position: 'relative'
  },
  //map
  mapStyle: {
    width: window.width,
    height: window.height,
  },
  marker: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Sizes.base * 2,
    padding: 7,
    borderWidth: 2,
    borderColor: Colors.tintColor,
    color: Colors.tintColor ,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2
  },
  active: {
    backgroundColor: Colors.markerColor,
    color: Colors.white,
  },
  //Modal
  modalContainer: {
    marginHorizontal: Sizes.base ,
    marginBottom: Sizes.base* 3.49,
    justifyContent: 'flex-end',
  },
  modal: {
    flexDirection: 'column',
    height: window.height * 0.32,
    paddingHorizontal: Sizes.base,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Sizes.base,
    borderTopRightRadius: Sizes.base,
  },
  modalHeader: {
    paddingTop: 15, 
    flex: .4, 
    flexDirection: 'row',
  },
  logo: {
    fontWeight: 'bold', 
    fontSize: 25, 
    paddingVertical: Sizes.padding / 4,
    paddingLeft: 2
  },
  semiText: {
    color: Colors.gray,
  },
  bageLogo: {
    borderWidth: 1,
    borderColor: Colors.markerColor,
    padding: Sizes.padding / 3,
    marginBottom: Sizes.margin / 4,
    backgroundColor: Colors.markerColor,
    borderRadius: Sizes.base,
    alignItems: 'center',
    justifyContent: 'center'
  },
  goToShopBtn: {
    borderWidth: 2,
    borderColor: Colors.tintColor,
    padding: 5,
    borderRadius: Sizes.base,
  },
  modalBody: {
    flex: .6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  category: {
    flex: .34,
    borderColor: Colors.tintColor,
    alignItems: "center",
    borderTopLeftRadius: Sizes.base,
    borderTopRightRadius: Sizes.base,
  },
  CategoryShadow: {
    shadowColor: Colors.markerColor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2
  },
});