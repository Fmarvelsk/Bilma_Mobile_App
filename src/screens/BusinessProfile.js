//import liraries
import React, { Component, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
  Dimensions,
  TextInput
} from "react-native";
import MIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { addFavorite, saveUserFavourite } from "../store/action";


const { width } = Dimensions.get("window")
const height = width * 4


const BusinessProfile = ({ route }) => {

  const [categoryId, setCategoryId] = useState()
  const [loading, setLoading] = useState(false)
  const { user, favourite, profile } = useSelector(s => s.rootReducer)
  const dispatch = useDispatch()
  const [save, setSaved] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [userReview, setUserReview] = useState([])
  const [showReview, setShowReview] = useState(false)
  const [loadingComment, setLoadingComment] = useState(false)
  const [comment, setComment] = useState('')
  const [loadingNotify, setLoadingNotify] = useState(false)

  const fetchBusinessInformation = useCallback(async () => {
    try {
      await db.collection('data').doc(route.params)
        .get().then(async snap => {
          setCategoryId(snap.data())
          if (snap.data().reviews)
            setUserReview(snap.data().reviews)
          setLoading(false)

        })
    } catch (err) {
      console.log(err)
    }
  }, [route, favourite])

  //console.log(favourite)
  useEffect(() => {
    let res = favourite.find((fav) => fav.name === categoryId?.name)
    setSaved(res)

  }, [favourite, categoryId])

  async function sendPushNotification(expoPushToken) {
    setLoadingNotify(true)
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Request for quote',
      body: `${profile.name} has requested for a quote!`,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    setLoadingNotify(false)
  }
  async function NotificationToUser() {
    const res = await db.collection('profiles').get()
    res.docs.map((user) => { 
      let data = user.data()
        return sendPushNotification(data.token)
    })
  }


  const addToFavorite = () => {
    setIsLoading(true)
    db.collection('profiles').doc(user).set({
      favourite: [...favourite, categoryId]
    }, { merge: true })
      .then(res => {
        dispatch(addFavorite(categoryId))
        setIsLoading(false)

      })
      .catch(err => {
        setIsLoading(false)
        console.log(err, 'error')
      })

  }

  async function addReviews() {
    setLoadingComment(true)
    let data = {
      comment : comment,
      date : "15/12/2021",
      name : profile.name,
      rating : 5
    }
    try {
      await db.collection('data').doc(route.params)
        .set({
          reviews: [...userReview, data]
        }, { merge: true })

    }
    catch (err) {
      console.log(err)
      setLoadingComment(false)
    }
    setLoadingComment(false)
    setShowReview(true)
  }

  const removeFromFavourite = async () => {
    setIsLoading(true)

    const newFav = favourite.filter((item) => {
      return item.name !== categoryId.name;
    });
    dispatch(saveUserFavourite(newFav))
    await db.collection('profiles').doc(user).set({
      favourite: [...newFav]
    }, { merge: true })
    setIsLoading(false)
  }
  useEffect(() => {
    fetchBusinessInformation()
  }, [fetchBusinessInformation])

  
  return (
    <>
      {categoryId && !loading ? (
        <View style={{ position: "relative",  backgroundColor: "#fff" }}>

          <View style={styles.hireContainer}>

            {loadingNotify ? 
          <ActivityIndicator size="large" color="#0000ff" />
           : <TouchableOpacity style={styles.hireButton} onPress={NotificationToUser}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Lato_bold",
                  paddingVertical: 16,
                }}>
                Send a Notification
              </Text>
            </TouchableOpacity> }
          </View>
          <ScrollView style={{ backgroundColor: "#fff", paddingVertical: 25, position: "relative", height:  'auto' }}>
            <StatusBar translucent />
            <View style={styles.container}>
              <View style={styles.backgroundImageContainer}>

                {!save && !isLoading ?
                  <TouchableOpacity style={styles.textBackgroundImage} onPress={addToFavorite}>

                    <Text style={{ color: 'blue' }}>Add to Favourite</Text>
                  </TouchableOpacity>
                  : save && !isLoading ?
                    <TouchableOpacity style={styles.textBackgroundImage} onPress={removeFromFavourite}>

                      <Text style={{ color: 'blue' }}>Remove from Favourite</Text>
                    </TouchableOpacity>
                    :
                    <View style={styles.isLoading}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
                <Image source={{ uri: categoryId.image ? `${categoryId.image}` 
                : 'https://ninejars.co.uk/wp-content/uploads/2020/11/placeholder-profile-male.jpg' 
                }} style={styles.backgroundImage} />
              </View>
              <Text style={styles.serviceName}>{categoryId.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 48,
                  marginBottom: 8,
                  marginTop: 8,
                }}>
                <MIcons
                  name="stars"
                  size={24}
                  color="#2d9cdb"
                  style={[styles.star, { marginRight: 4 }]}
                />
                <Text style={{ fontFamily: "Lato" }}>{categoryId.rating} reviews</Text>
              </View>
              <View style={styles.horizontalLine} />
              <View style={styles.businessDetails}>
                <View style={styles.detail}>
                  <MIcons
                    name="calendar-today"
                    size={24}
                    color="#2d9cdb"
                    style={styles.icon}
                  />
                  <View>
                    <Text style={{ fontFamily: "Lato_bold" }}>Availability</Text>
                    <Text
                      style={{ color: "#888", fontSize: 12, fontFamily: "Lato" }}>
                      Monday - Friday
                    </Text>
                  </View>
                </View>
                <View style={styles.detail}>
                  <MIcons
                    name="phone-in-talk"
                    size={24}
                    color="#2d9cdb"
                    style={styles.icon}
                  />
                  <View>
                    <Text style={{ fontFamily: "Lato_bold" }}>Phone number</Text>
                    <Text
                      onPress={() => { Linking.openURL(`tel:${categoryId.phoneNumber}`); }}
                      style={{ color: "#888", fontSize: 12, fontFamily: "Lato" }}>
                      {categoryId.phoneNumber || ''}
                    </Text>
                  </View>
                </View>
                <View style={[styles.detail, { width: "100%" }]}>
                  <MIcons
                    name="location-on"
                    size={24}
                    color="#2d9cdb"
                    style={styles.icon}
                  />
                  <View style={{ width: '80%' }}>
                    <Text style={{ fontFamily: "Lato_bold" }}>
                      {categoryId.location}
                    </Text>
                    <Text
                      style={{ color: "#888", fontSize: 12, fontFamily: "Lato" }}>
                      Osun
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.horizontalLine} />
              <View style={styles.descriptionContainer}>
                <Text style={{ fontFamily: "Lato_bold" }}>Description</Text>
                <Text style={{ marginTop: 8, lineHeight: 21, fontFamily: "Lato" }}>
                  {categoryId.description || 'No description'}</Text>
              </View>
              <View style={styles.horizontalLine} />
              <View style={styles.reviewContainer}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: "row", marginBottom: 16 }}>
                    <Text style={{ fontFamily: "Lato_bold" }}>Reviews</Text>
                    <Text style={{ marginLeft: 4, fontFamily: "Lato" }}>{userReview.length}</Text>
                  </View>

                  <View>
                    <TouchableOpacity style={{ width: '70%', backgroundColor: '#e8f1fe', textAlign : 'center' }} onPress={() => setShowReview(true)}>
                      <Text
                        style={{
                          color: "#2d9cdb",
                          fontFamily: "Lato_bold",
                          padding: 16,
                        }}>
                        Add Review
                      </Text>
                    </TouchableOpacity>

                  </View>
                </View>
                {showReview &&
                <>
                  <View style={{borderWidth : 1, paddingHorizontal: 10, marginVertical : 10}}>
                    <TextInput
                      multiline={true}
                      numberOfLines={5}
                      onChangeText={text => setComment(text)}
                      style={styles.desc}
                    //placeholder="Description of business"

                    />

                  </View>
                  <View style={{alignContent : 'flex-end', alignItems : 'flex-end' }}>
                    {!loadingComment ?
                  <TouchableOpacity style={{ width: '50%', backgroundColor: '#e8f1fe', }} onPress={addReviews}>
                      <Text
                        style={{
                          color: "#2d9cdb",
                          fontFamily: "Lato_bold",
                          padding: 16,
                        }}>
                        Add Reviews
                      </Text>
                    </TouchableOpacity>
                    : <ActivityIndicator size="large" color="#0000ff"/>}
                    </View>
                  </>
                  }
                {userReview.length > 0 ?
                  <FlatList
                    data={userReview}
                    nestedScrollEnabled
                    style={{ marginBottom: 48 }}
                    // keyExtractor={(item) => item.toString()}
                    renderItem={({ item, index }) => (
                      <View key={index}>
                        <View style={styles.reviewHeader}>
                          <View style={{ marginBottom: 8 }}>
                            <Text style={{ fontFamily: "Lato_bold" }}>
                              {item.name}
                            </Text>
                            <View style={{ flexDirection: "row", marginTop: 2 }}>
                              <MIcons
                                name="stars"
                                size={24}
                                color="#2d9cdb"
                                style={styles.star}
                              />
                              <MIcons
                                name="stars"
                                size={24}
                                color="#2d9cdb"
                                style={styles.star}
                              />
                              <MIcons
                                name="stars"
                                size={24}
                                color="#2d9cdb"
                                style={styles.star}
                              />
                              <MIcons
                                name="stars"
                                size={24}
                                color="#2d9cdb"
                                style={styles.star}
                              />
                              <MIcons
                                name="stars"
                                size={24}
                                color="#2d9cdb"
                                style={styles.star}
                              />
                            </View>
                          </View>
                          <Text
                            style={{
                              color: "#888",
                              fontSize: 12,
                              fontFamily: "Lato",
                            }}>
                            {item.date}
                          </Text>
                        </View>
                        <Text
                          style={{
                            marginTop: 4,
                            lineHeight: 21,
                            fontFamily: "Lato",
                            marginBottom: 20
                          }}>
                          {item.comment}</Text>
                      </View>
                    )}
                  />
                  : <View>
                    <Text>No review</Text>
                  </View>}
              </View>
            </View>
          </ScrollView>

        </View>
      ) : (<View style={{ flex: 1, justifyContent: "center" }}>

        <ActivityIndicator size="large" color="#0000ff" />
      </View>)}
    </>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    height: 230,
    width: "100%",
    borderRadius: 10,
  },
  backgroundImageContainer: {
    position: "relative",

  },
  isLoading: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,

  },
  textBackgroundImage: {
    position: "absolute",
    bottom: 24,
    right: 24,
    zIndex: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#e8f1fe",
    fontFamily: "Lato",
    color: "#2d9cdb",
  },
  serviceName: {
    marginTop: 8,
    color: "#000",
    marginLeft: 18,
    fontSize: 18,
    fontFamily: "Lato_bold",
  },
  serviceReviews: {
    marginTop: 16,
    color: "#888",
    marginLeft: 40,
  },
  horizontalLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#2D9CDB",
    opacity: 0.3,
  },
  businessDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 10,
  },
  icon: {
    backgroundColor: "#e8f1fe",
    padding: 4,
    marginRight: 8,
  },
  descriptionContainer: {
    padding: 16,
  },
  reviewContainer: {
    padding: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  star: {
    backgroundColor: "transparent",
  },
  hireContainer: {
    width: "50%",
    position: "absolute",
    bottom: 10,
    right: 0,
    alignItems: "center",
    zIndex: 3,
  },
  hireButton: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#2D9CDB",
  },
});

//make this component available to the app
export default BusinessProfile;
