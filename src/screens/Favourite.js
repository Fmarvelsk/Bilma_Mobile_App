import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Rating } from "react-native-ratings";
import { useSelector } from "react-redux";

const STAR = require("../assets/favourite.png");

export default function Favourite({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { favourite } = useSelector((s) => s.rootReducer);
  const navigate = useNavigation();

  return (
    <SafeAreaView style={style.container}>
      <View style={{ paddingLeft: 10 }}>
        <Text style={{ fontSize: 16, marginTop: 20, fontWeight: "500" }}>
          My Favourite
        </Text>
      </View>
      {favourite.length > 0 ? (
        <FlatList
          nestedScrollEnabled
          style={{ backgroundColor: "#fff" }}
          data={favourite}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigate("BusinessProfile", item.id)}
            >
              <View style={{ paddingLeft: 50 }}>
                <View style={style.favcon}>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 20,
                      position: "relative",
                    }}
                  >
                    <Image
                      style={style.fav}
                      source={{ uri: `${item.image}` }}
                    />
                    <View style={{ lineHeight: 10, width: "55%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          paddingBottom: 3,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "100",
                          color: "#808080",
                          paddingBottom: 20,
                        }}
                      >
                        {item.category}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Text>Rating</Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Rating
                              type="custom"
                              imageSize={16}
                              ratingImage={STAR}
                              style={{ left: -4 }}
                              // ratingBackgroundColor="#f4f4f4"
                              // ratingColor="blue"
                              ratingCount={1}
                              readonly={true}
                            />
                            <Text>{item.rating || "no rating"}</Text>
                          </View>
                        </View>
                        {item.rate ? (
                          <View>
                            <Text>Hourly Rate</Text>
                            <Text>{item.rate}</Text>
                          </View>
                        ) : (
                          <View>
                            <Text>Phone no</Text>
                            <Text>{item.phoneNumber || ""}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      ) : (
        <View style={{ paddingLeft: 50 }}>
          <Text style={{ fontSize: 18 }}>No favourite have been added</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  fav: {
    width: 120,
    height: 120,
    borderRadius: 10,
    left: -30,
  },
  favcon: {
    marginTop: 40,
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
  },
});
