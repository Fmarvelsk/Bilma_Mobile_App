import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, auth, db } from '../../firebase'

export default function SignUpProfile({ setSignUp }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [selectedValue, setSelectedValue] = useState('')
    const [phoneNumber, setTelephone] = useState("")
    const [businessType, setBusinessType] = useState("")
    const [address, setAddress] = useState("")
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState();
    const [photoLoading, setPhotoLoading] = useState(false)

    function createUser() {
        setErrorMsg('')
        if (email.length === 0 || password.length === 0)
            return setErrorMsg("Field cannot be empty")
        setLoading(true)

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential)
                return db.collection('profiles').doc(userCredential.uid).set({
                    email: email,
                    Name: fullName,
                    phoneNumber: phoneNumber,
                    businessType: businessType || '',
                    address: address || '',
                    image : photo
                })
                // ...
            }).then(() => setSignUp(1))
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    async function handleChoosePhoto() {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted')
                return alert('Sorry, we need camera roll permissions to make this work!');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });


        if (!result.cancelled) {
            sendToStorage(result.uri)
        };

    }
        async function sendToStorage(uri) {
            const metadata = {
                contentType: 'image/jpeg'
            };
            try {
               // setPhoto(result)
                const response = await fetch(uri);
                const blob = await response.blob();
                const imgName = uri.slice(-10)
                const uploadTask = storage.ref().child('images/' + `userProfileId ${imgName}`).put(blob, metadata);
                uploadTask.on('state_changed',
                     (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if(progress === 100){
                         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            setPhoto(downloadURL)
                        });
                    }
                    }
                );
            }
            catch (err) {
                console.log(err)
            }
            
            console.log('end')
      }

    return (
        <>
            {selectedValue === 'user' ?
                (<>
                    <Text style={styles.headerText}>
                        Register An Account

                    </Text>

                    <TouchableWithoutFeedback>
                        <View style={{ position: 'relative' }}>

                            <Image
                                source={{
                                    uri: photo ? photo :
                                        'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image-300x300.jpeg'
                                }}
                                style={styles.profileImage} />
                            <TouchableOpacity style={{ position: 'absolute', bottom: 0, left: 40, width: 80, height: 80 }} title="Choose Photo" onPress={handleChoosePhoto}>
                                <Text style={{ opacity: 0 }}>upload</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.login}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setFullName(text)}
                            placeholder="Name"
                        />
                    </View>
                    <View style={styles.login}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setEmail(text)}
                            placeholder="Email"
                        />
                    </View>

                    <View style={styles.login}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setTelephone(text)}
                            placeholder="Phone number"
                        />
                    </View>

                    <View style={styles.login}>
                        <TextInput
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                    </View>
                    {!loading ?
                        (<TouchableOpacity style={styles.btnView} onPress={createUser}>

                            <Text
                                style={styles.loginText}

                            >SIGNUP</Text>
                        </TouchableOpacity>) :
                        (<>
                            <ActivityIndicator size="small" color="#0000ff" />
                            <Text>Loading.....</Text>
                        </>)}


                    <TouchableOpacity>
                        <Text style={{
                            height: 30,
                            marginTop: 10,
                        }}
                            onPress={() => setSignUp(1)}
                        > Already have an account? </Text>
                    </TouchableOpacity>
                </>) : selectedValue === 'merchant'
                    ?
                    (
                        <>
                            <Text style={styles.headerText}>
                                Register An Account

                            </Text>
                            <View style={styles.login}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setFullName(text)}
                                    placeholder="Name Or Name of Business"
                                />
                            </View>
                            <View style={styles.login}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setEmail(text)}
                                    placeholder="Email"
                                />
                            </View>

                            <View style={styles.login}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setTelephone(text)}
                                    placeholder="Phone number"
                                />
                            </View>

                            <View style={styles.login}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setAddress(text)}
                                    placeholder="Shop address"
                                />
                            </View>


                            <View style={styles.login}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setBusinessType(text)}
                                    placeholder="Business Type"
                                />
                            </View>

                            <View style={styles.login}>
                                <TextInput
                                    onChangeText={text => setPassword(text)}
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                />
                            </View>

                            {!loading ?
                                (<TouchableOpacity style={styles.btnView} onPress={createUser}>

                                    <Text
                                        style={styles.loginText}

                                    >SIGNUP</Text>
                                </TouchableOpacity>) :
                                (<>
                                    <ActivityIndicator size="small" color="#0000ff" />
                                    <Text>Loading.....</Text>
                                </>)}



                            <TouchableOpacity>
                                <Text style={{
                                    height: 30,
                                    marginTop: 10,
                                }}
                                    onPress={() => setSignUp(1)}
                                > Already have an account? </Text>
                            </TouchableOpacity>

                        </>
                    ) :
                    (<>
                        <View>
                            <Text style={{ fontSize: 20 }}>Choose Option </Text>
                        </View>
                        <TouchableOpacity style={styles.btnView} onPress={() => setSelectedValue('user')}>

                            <Text
                                style={styles.loginText}>BUYER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnView} onPress={() => setSelectedValue('merchant')}>

                            <Text
                                style={styles.loginText}

                            >SELLER</Text>
                        </TouchableOpacity>
                    </>
                    )

            }
        </>
    )
}

const styles = StyleSheet.create({
    login: {
        borderRadius: 30,
        width: "60%",
        height: 45,
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginBottom: 20,

    },
    profileImage: {
        margin: 10,
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        borderWidth: 1,
        borderColor: 'black',
    },
    loginText: {
        color: '#fff'
    },
    input: {
        padding: 10,
        height: 50,
        flex: 1,
        marginLeft: 8
    },
    headerText: {
        color: '#192A51',
        marginBottom: 24,
        fontSize: 23
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

});
