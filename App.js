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
import {Picker} from '@react-native-picker/picker'

export default function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [signUp, setSignUp] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  return (
    <View style={styles.container}>
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

            <Text style={styles.loginText}>SIGNUP</Text>
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
          }} source={require('./assets/profile.png')} />
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
          <TouchableOpacity style={styles.btnView}>

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

          <StatusBar style="auto" />
        </>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7D7D7',
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
  input: {
    padding: 10,
    height: 50,
    flex: 1,
    marginLeft: 8

  },
  headerText: {
    color: '#ff6666',
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
    backgroundColor: "#FF1493",
  },

});
