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
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebase';
import SignUpProfile from '../contexts/HomeScreen/Signup';

export default function AccessScreen({ navigation, setUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [signUp, setSignUp] = useState(1)
  const [selectedValue, setSelectedValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  function authenticateUser() {
    setErrorMsg('')
    if (email.length === 0 || password.length === 0) 
      return setErrorMsg("Field cannot be empty")
      setLoading(true)
       
    auth.signInWithEmailAndPassword(email, password).then(auth => {
       setUser(true)
    }).catch(err => {
      console.log(err) 
      setLoading(false)
      setErrorMsg('Invalid Credentials')})
   
  }


  return (
    <LinearGradient colors={['#F5F5F573', '#D7D7D780']} style={styles.container}>
      {signUp === 2 ?
        (
          <SignUpProfile setSignUp={setSignUp}/>
        )
        : signUp === 1 ?
        (<>
          <Text style={styles.headerText}>Welcome To Kilonta!</Text>
          <Image style={{
            marginBottom: 30
          }} source={require('../assets/profile.png')} />
          <View style={styles.login}>
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              value={email}
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
          {!loading ? (<TouchableOpacity
            style={styles.btnView}
            onPress={authenticateUser}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>)
            : (<>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text>Loading.....</Text>
            </>)}

          <TouchableOpacity onPress={() => setSignUp(3)}>
            <Text style={{
              height: 30,
              marginTop: 10,

            }}> Forgot Password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{
              height: 30,
              marginTop: 10,
            }}
              onPress={() => setSignUp(2)}
            > Dont have an Account? Register </Text>
          </TouchableOpacity>
          <Text style={{
            color: 'red'
          }}>{errorMsg}</Text>


          <StatusBar style="auto" />
        </>) : 
        signUp === 3 ? (<>
          <Text style={styles.headerText}>
         Forgot Password
        </Text>
        <View style={styles.login}>
            <TextInput
              style={styles.input}
              onChange={text => setEmail(text)}
              placeholder="email"
            />
          </View>
      </>) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
