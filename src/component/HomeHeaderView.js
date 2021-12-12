import React, { useState, useCallback, useEffect } from "react";
import {
View,
Text, 
StyleSheet,
ScrollView, 
TouchableWithoutFeedback, 
Image, 
Dimensions, 
TouchableOpacity, 
FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import bell from '../assets/bell.png'
import sech from '../assets/search.png'
import Search from "./Searchbar";
import CustomImage from "./CustomImage";
import Header from "./Header";
import { db } from "../firebase";
import { useSelector } from "react-redux";


const { width } = Dimensions.get("window")
const height = width * 0.25

const image = [
    {
        url: `data:image/png;base64,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`,
        label: "Carpenter",
    },
    {
        url: "data:image/png;base64,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",
        label: "Plumber"
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScCajsUwpJWtbeFk32-NmEItYlgw793POkbQ&usqp=CAU",
        label: "Painter",
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6tf4QJTMu7SKKTKW2HwyLU2iDlx6NDpwncw&usqp=CAU",
        label: "Laundry"
    },
    {
        url: "data:image/png;base64,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",
        label: "Cleaner"
    },
    {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUOJI3C8rFbEr1vsE4OnRr1Dcmw4cVm3nq6w&usqp=CAU",
        label: "Tutor"
    },
    {
        url: "data:image/png;base64,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",
        label: "Electrician"
    }, {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Ko1KL8RvElEWuW9-t0VadDOUpAbiR-MrMA&usqp=CAU",
        label: "Boutique"
    },
    {
        url: "data:image/png;base64,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",
        label: "Vendor"
    }, {
        url: "https://www.kindpng.com/picc/m/80-803130_salon-icon-png-transparent-png.png",
        label: "Beauty & Salon"
    }, {
        url: "https://image.pngaaa.com/999/4818999-middle.png",
        label: "Barber"
    }

]

export default function HomeHeaderView({ navigation, children, header }) {
    const [search, setSearch] = useState('')
    const { user } = useSelector(s => s.rootReducer)
    const [fetchData, setAllFetchData] = useState([])
    const [filteredData, setFilteredData] = useState()

    function searchEngine(text) {
        if (text) {
            let findName = fetchData.filter((data) => {
                const itemData = data.result.category.toLowerCase()
                const textData = text.toLowerCase()
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(findName)
        }
        else {
            setFilteredData()
        }
       
    }

    const getAllData = useCallback(async () => {
        try {
            await db.collection('data').get().then((snap) => {
                let data = snap.docs.map((res) => {
                    let id = res.id
                    let result = res.data()
                    return { result, id }

                })
                setAllFetchData(data)
            })
        }
        catch (err) {
            console.log(err)
        }
    }, [user])

    useEffect(() => {
        getAllData()
    }, [getAllData])


    return (
        <>

            <ScrollView style={style.scroll}>
                <LinearGradient colors={['#F5F5F573', '#D7D7D780']} style={style.topColor}>

                    <View style={style.topNav}>
                        <View>
                            <Text style={style.txt}>Location</Text>
                            <Text>Ile-Ife</Text>
                        </View>
                        <Image source={bell} width={24} height={24} />
                    </View>


                    <View style={style.inputField}>
                        <Search
                            style={style.search}
                            text={"What do you need?"}
                            onChange={(value) => searchEngine(value)}
                        //value={search}
                        />

                        <Image source={sech} style={{ position: 'absolute', top: 12, left: 10 }} width={20} width={20} />
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
                    <FlatList
                        style={{height: 160, overflow: 'hidden', overflowY : 'auto'}}
                        data={filteredData}
                        renderItem={({ item, index }) => (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('BusinessProfile', item.id
                            )}>
                                <Text style={{padding:10}}>{item.result.name || ' '}</Text>
                            </TouchableWithoutFeedback>
                        )}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 0.5, backgroundColor: '#c8c8c8' }}></View>
                        )}
                    />

                </LinearGradient>

                <View style={style.container}>
                    <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: "row" }}>
                        <Header>
                            Categories
                        </Header>

                        <TouchableOpacity>
                            <Text style={{ color: '#76A0F3' }}>See all</Text>
                        </TouchableOpacity>

                    </View>
                    <View>

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ width, height }}>
                            {image.map((image, i) => (
                                <CustomImage url src={image.url} key={i} text={image.label} navigation={navigation} />
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <View style={style.container}>
                    {children}
                </View>
                {header && (<View style={{ paddingHorizontal: 20 }}><Text>Recommended</Text></View>)}
            </ScrollView>
        </>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    topColor: {
        alignItems: 'center',
        paddingTop: '10%',
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    topNav: {
        justifyContent: 'space-between',
        width: '85%',
        flexDirection: "row"
    },
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        borderRadius: 11,
        width: "70%",
        height: 45,
        marginTop: 40,
        backgroundColor: 'transparent',
        borderWidth: 0.5,

    },
    scroll: {
        flexGrow: 1,
        backgroundColor: '#fff'
    },
    search: {
        padding: 10,
        height: 45,
        marginLeft: 40,
        fontSize: 12
    },
    txt: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: 12
    }

})