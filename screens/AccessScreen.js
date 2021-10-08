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
} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient';

export default function AccessScreen({ navigation, setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [signUp, setSignUp] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function authenticateUser(){
    if(username.length === 0  || password.length === 0 ){
      return setErrorMsg("Field cannot be empty") 
    }
    setUser(true)
    navigation?.navigate('Home')
    
  }

  return (
    <LinearGradient colors={['#F5F5F573', '#D7D7D780']} style={styles.container}>
      {signUp ?
        (<>
          <Text style={styles.headerText}>
            Register An Account

          </Text>
          <View style={styles.login}>
            <TextInput
              style={styles.input}
              onChange={text => setFullName(text)}
              placeholder="Fullname"
            />
          </View>
          <View style={styles.login}>
            <TextInput
              style={styles.input}
              onChange={text => setUsername(text)}
              placeholder="Username"
            />
          </View>

          <View style={styles.login}>
            <TextInput
              style={styles.input}
              onChange={text => setUsername(text)}
              placeholder="Email"
            />
          </View>
          <View style={styles.login}>
            <Picker
              selectedValue={selectedValue}
              style={styles.input}
              mode={'dropdown'}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Merchant" value="merchant" />
              <Picker.Item label="User" value="user" />
            </Picker>
          </View>

          <View style={styles.login}>
            <TextInput
              onChangeText={text => setPassword(text)}
              style={styles.input}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity style={styles.btnView}>

            <Text
              style={styles.loginText}
             
            >SIGNUP</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{
              height: 30,
              marginTop: 10,
            }}
              onPress={() => setSignUp(false)}
            > Already have an account? </Text>
          </TouchableOpacity>
        </>)
        :
        (<>
          <Text style={styles.headerText}>Welcome To Bilma!</Text>
          <Image style={{
            marginBottom: 30
          }} source={require('../assets/profile.png')} />
          <View style={styles.login}>
            <TextInput
              style={styles.input}
              onChange={text => setUsername(text)}
              placeholder="Username"
            />
          </View>
          <View style={styles.login}>
            <TextInput
              onChangeText={text => setPassword(text)}
              style={styles.input}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity 
          style={styles.btnView} 
          onPress={authenticateUser}>

            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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
              onPress={() => setSignUp(true)}
            > Dont have an Account? Register </Text>
          </TouchableOpacity>
          <Text style={{
              color : 'red'
            }}>{errorMsg}</Text>


          <StatusBar style="auto" />
        </>)}
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
