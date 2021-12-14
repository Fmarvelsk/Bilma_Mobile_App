import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import HomeHeaderView from "../component/HomeHeaderView";
import Header from "../component/Header";
import pic from "../assets/pic.png";
import { Rating } from "react-native-ratings";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const STAR = require("../assets/star.png");

export default function Category({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { category } = useSelector((s) => s.rootReducer);
  const [categoryList, setCategoryList] = useState();

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      await db
        .collection("data")
        .where("category", "==", `${category}`)
        .get()
        .then((snapshot) => {
          let data = snapshot.docs.map((snap) => {
            const result = snap.data();
            const id = snap.id;
            return { result, id };
          });
          setCategoryList(data);
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [category]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading ? (
        <FlatList
          ListHeaderComponent={() => (
            <HomeHeaderView navigation={navigation} header />
          )}
          nestedScrollEnabled
          style={{ backgroundColor: "#fff" }}
          data={categoryList}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("BusinessProfile", item.id)}
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
                      source={{ uri: item.result.image ? `${item.result.image}` :
                    'https://ninejars.co.uk/wp-content/uploads/2020/11/placeholder-profile-male.jpg'
                    }}
                    />
                    <View style={{ lineHeight: 10, width: "55%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          paddingBottom: 3,
                        }}
                      >
                        {item.result.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "100",
                          color: "#808080",
                          paddingBottom: 20,
                        }}
                      >
                        {item.result.category}
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
                              ratingBackgroundColor="#f4f4f4"
                              // ratingColor="blue"
                              ratingCount={1}
                              readonly={true}
                            />
                            <Text>{item.result.rating || "No review"}</Text>
                          </View>
                        </View>
                        {item.result.rate ? (
                          <View>
                            <Text>Hourly Rate</Text>
                            <Text>{item.result.rate}</Text>
                          </View>
                        ) : (
                          <View>
                            <Text>Phone no</Text>
                            <Text>{item.result.phoneNumber || ""}</Text>
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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
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
    //height: 180
  },
});
