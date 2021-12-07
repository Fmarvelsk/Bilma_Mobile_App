//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import MIcons from "react-native-vector-icons/MaterialIcons";
import BackgroundImg from "../assets/jaypee.jpeg";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// create a component
const BusinessProfile = () => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
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
          <Text>500 reviews</Text>
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
              <Text>Availability</Text>
              <Text style={{ color: "#888", fontSize: 12 }}>
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
              <Text>Phone number</Text>
              <Text style={{ color: "#888", fontSize: 12 }}>
                +2349047395773
              </Text>
            </View>
          </View>
          <View style={styles.detail}>
            <MIcons
              name="location-on"
              size={24}
              color="#2d9cdb"
              style={styles.icon}
            />
            <View>
              <Text>Parakin, Mayfair</Text>
              <Text style={{ color: "#888", fontSize: 12 }}>Osun</Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.descriptionContainer}>
          <Text>Description</Text>
          <Text style={{ marginTop: 8, lineHeight: 18 }}>
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
            <Text>Reviews</Text>
            <Text style={{ marginLeft: 4 }}>(500)</Text>
          </View>
          <FlatList
            data={data}
            nestedScrollEnabled
            keyExtractor={(item) => item.toString()}
            renderItem={() => (
              <View style={styles.review}>
                <View style={styles.reviewHeader}>
                  <View style={{ marginBottom: 8 }}>
                    <Text>Wade Warren</Text>
                    <View style={{ flexDirection: "row" }}>
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
                  <Text style={{ color: "#888", fontSize: 12 }}>
                    April 10th, 2022
                  </Text>
                </View>
                <Text
                  style={{ marginTop: 4, lineHeight: 18, marginBottom: 16 }}>
                  Very great service, highly recommended sjkbcsbsdjcsjlkscjsb
                  jbdsib iv si buivbsjbvsvuuiiiiiiiiisvuisbu bs bjsbvs sbibv
                  busbvs vbsjv svsiu sbi vsdvsvsvsv sb sis svy y csshvs sys v s
                  sjhd vs ui visvusivsuivsdh hss hsui vusdvsh ss si si sd hs sd
                  skv sd sdka nui nvweu ewfgibsvkuvi
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    bottom: 16,
    right: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#e8f1fe",
    color: "#2d9cdb",
  },
  serviceName: {
    marginTop: 8,
    color: "#000",
    marginLeft: 18,
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
    flexBasis: "50%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
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
});

//make this component available to the app
export default BusinessProfile;
