//import liraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import Placeholder from "../assets/Rec.png";
import PlaceholderProfile from "../assets/endYear.jpeg";

// create a component
const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar />
      <View style={styles.innerContainer}>
        <Text style={{ textAlign: "center", fontSize: 18, padding: 20 }}>Profile</Text>
        <Image source={Placeholder} style={styles.headingProfile} />
        <View style={styles.profileImageContainer}>
          <Image source={PlaceholderProfile} style={styles.profileImage} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.itemLeft}>Name</Text>
            <Text numberOfLines={3} style={styles.itemRight}>
              Brooklyn Simmons
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.itemLeft}>Business Type</Text>
            <Text numberOfLines={3} style={styles.itemRight}>
              Carpenter
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.itemLeft}>Email</Text>
            <Text numberOfLines={3} style={styles.itemRight}>
              abcxyz@gmail.com
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.itemLeft}>Phone Number</Text>
            <Text numberOfLines={3} style={styles.itemRight}>
              09067234718
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.itemLeft}>Address</Text>
            <Text numberOfLines={3} style={styles.itemRight}>
              Block 5, Sinzu plaza OAU central market
            </Text>
          </View>
        </View>

        <View>
          <Text>Logout</Text>
          </View>

      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: "#e5e5e5",
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
  innerContainer: {flex: 1},
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
