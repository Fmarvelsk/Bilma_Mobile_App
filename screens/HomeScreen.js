import { LinearGradient } from "expo-linear-gradient";
import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Search from "../component/Searchbar";
import HomeInformation from "../contexts/HomeInformation";

export default function Home() {
    const [search, setSearch] = useState('')
    
    return(
        <>
        <ScrollView style={style.scroll}>
        <LinearGradient colors={['#F5F5F573', '#D7D7D780']} style={style.topColor}>
    
            <View style={style.inputField}>
                <Search
                style={style.search}
                text={"What do you need?"}
                onChange={(value) => setSearch(value)}
                value={search}
                />
                {
     search ?
      <TouchableOpacity
         onPress={() => setSearch('')}
         style={style.vwClear}
         >
      </TouchableOpacity>
     : 
     <View 
     style={style.vwClear}
     />
}
            </View>

        </LinearGradient>

        <View>
           <HomeInformation/>
           </View>
        
        </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
topColor: {
    alignItems: 'center',
    paddingTop: '10%',
    paddingBottom: 40,
    borderBottomLeftRadius : 30,
    borderBottomRightRadius :30
},
vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
},
inputField: {
    borderRadius: 11,
    width: "60%",
    height: 45,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    marginBottom: 20,

},
scroll : {
    flexGrow: 1
},
search: {
    padding: 10,
    height: 50,
    flex: 1,
    marginLeft: 8
}
})