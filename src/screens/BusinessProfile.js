//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MIcons from "react-native-vector-icons/MaterialIcons";
import BackgroundImg from "../assets/jaypee.jpeg";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// create a component
const BusinessProfile = () => {
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.hireContainer}>
        <TouchableOpacity style={styles.hireButton}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "Lato_bold",
              paddingVertical: 16,
            }}>
            Hire now
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ backgroundColor: "#fff", position: "relative" }}>
        <StatusBar translucent />
        <View style={styles.container}>
          <View style={styles.backgroundImageContainer}>
            <Text style={styles.textBackgroundImage}>N 5000/hr</Text>
            <Image source={BackgroundImg} style={styles.backgroundImage} />
          </View>
          <Text style={styles.serviceName}>Band Carpentry Service</Text>
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
            <Text style={{ fontFamily: "Lato" }}>500 reviews</Text>
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
                  style={{ color: "#888", fontSize: 12, fontFamily: "Lato" }}>
                  +2349047395773
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
              <View>
                <Text style={{ fontFamily: "Lato_bold" }}>
                  Parakin, Mayfair
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
              I am a higly skilled trade and a craft in which the primary work
              performed is the cutting, shaping and installation of building
              materials during the construction of buildings, ships, timber
              bridges, concrete formwork, etc. worked with natural wood and did
              rougher work such as framing, but today many other materials are
              also used.
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.reviewContainer}>
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              <Text style={{ fontFamily: "Lato_bold" }}>Reviews</Text>
              <Text style={{ marginLeft: 4, fontFamily: "Lato" }}>(500)</Text>
            </View>
            <FlatList
              data={data}
              nestedScrollEnabled
              style={{ marginBottom: 48 }}
              keyExtractor={(item) => item.toString()}
              renderItem={() => (
                <View>
                  <View style={styles.reviewHeader}>
                    <View style={{ marginBottom: 8 }}>
                      <Text style={{ fontFamily: "Lato_bold" }}>
                        Wade Warren
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
                      April 10th, 2022
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginTop: 4,
                      lineHeight: 21,
                      fontFamily: "Lato",
                      marginBottom: 16,
                    }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Corporis accusamus, nisi quasi possimus aliquid maxime
                    numquam beatae harum quam, pariatur fugiat. Officia eum
                    minima nesciunt aliquam neque iste voluptatum obcaecati?
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    height: 180,
    width: "100%",
    borderRadius: 10,
  },
  backgroundImageContainer: {
    position: "relative",
    padding: 16,
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
    width: "100%",
    position: "absolute",
    bottom: 24,
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
