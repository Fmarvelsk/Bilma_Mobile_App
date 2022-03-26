import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Placeholder from "../assets/Rec.png";
import PlaceholderProfile from "../assets/endYear.jpeg";
import { auth, db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logoutProfile } from "../store/action";

const Profile = () => {
  const { user } = useSelector(s => s.rootReducer)
  const [profile, setUserProfile] = useState()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const fetchUserProfile = useCallback(async () => {
    setLoading(true)

    try {
      await db.collection('profiles').doc(user)
        .get().then(snap => {
          setUserProfile(snap.data())
          setLoading(false)
        })
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }, [user])

  function logoutUser() {
    auth.signOut()
    dispatch(logoutProfile())
  }

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar />
      {profile && !loading ?
        <View style={styles.innerContainer}>
          <Text style={{ textAlign: "center", fontSize: 18, padding: 20 }}>Profile</Text>
          <Image source={Placeholder} style={styles.headingProfile} />
          <View style={styles.profileImageContainer}>
            <Image source={{
              uri: profile.image ? profile.image :
                'data:image/png;base64,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'
            }} style={styles.profileImage} />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.itemLeft}>Name</Text>
              <Text numberOfLines={3} style={styles.itemRight}>
                {profile.name}
              </Text>
            </View>
            {profile.businessType ?
              (<View style={styles.detailItem}>
                <Text style={styles.itemLeft}>Business Type</Text>
                <Text numberOfLines={3} style={styles.itemRight}>
                  Carpenter
                </Text>
              </View>) : null}
            <View style={styles.detailItem}>
              <Text style={styles.itemLeft}>Email</Text>
              <Text numberOfLines={3} style={styles.itemRight}>
                {profile.email}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.itemLeft}>Phone Number</Text>
              <Text numberOfLines={3} style={styles.itemRight}>
                {profile.phoneNumber}
              </Text>
            </View>

            {profile.address ? (<View style={styles.detailItem}>
              <Text style={styles.itemLeft}>Address</Text>
              <Text numberOfLines={3} style={styles.itemRight}>
                {profile.address}
              </Text>
            </View>) : null}

          </View>

          <View>
            {!loading ? (<TouchableOpacity
              style={styles.btnView}
              onPress={logoutUser}>
              <Text style={{ color: '#fff' }}>LOGOUT</Text>
            </TouchableOpacity>)
              : (<>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text>Loading.....</Text>
              </>)}

          </View>
        </View>
        : (<View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size="large" color="#0000ff" />
        </View>)}

    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    //backgroundColor: "#e5e5e5",
  },

  btnView: {
    width: '60%',
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#192A51",
  },
  innerContainer: {
    flex: 1,
  },
  headingProfile: {
    borderRadius: 10,
    height: 144,
    width: "100%",
  },
  profileImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    top: -50,
    zIndex: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  detailsContainer: {
    marginTop: -18,
  },
  detailItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 15,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
  },
  itemLeft: {
    width: "50%",
    paddingLeft: 8,
  },
  itemRight: {
    width: "50%",
    fontWeight: "500",
    lineHeight: 21,
    paddingRight: 8,
  },
});

//make this component available to the app
export default Profile;
