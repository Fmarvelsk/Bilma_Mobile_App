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
    ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { auth, db } from '../../firebase';


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

    function createUser() {
        setErrorMsg('')
        if (email.length === 0 || password.length === 0)
            return setErrorMsg("Field cannot be empty")
        setLoading(true)

        auth.createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // Signed in 
                await db.collection('profiles').doc(userCredential.uid).set({
                    email : email,
                    Name : fullName,
                    phoneNumber : phoneNumber,
                    businessType : businessType || '',
                    address : address || '',
                })
                setSignUp(1) 
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }


    return (
        <>
            {selectedValue === 'user' ?
                (<>
                    <Text style={styles.headerText}>
                        Register An Account

                    </Text>
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
                                style={styles.loginText}>USER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnView} onPress={() => setSelectedValue('merchant')}>

                            <Text
                                style={styles.loginText}

                            >BUSINESS</Text>
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
