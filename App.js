import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Amplify, {Auth} from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { useState } from 'react';
Amplify.configure(awsconfig)


export default function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState("signIn");

  //signup function
  async function signUp(){
    try{
      await Auth.signUp({username, password, attributes:{email}})
      setStage("confirm")

    }catch(err){
      console.log("Error signing up", err)

    }

  }

  async function confirm(){
    try{
      await Auth.confirmSignUp(username, code);
      setStage("signIn")

    }catch(err){
      console.log("Error signing up", err)
    }

  }

  async function signIn(){
    try{
      const user = await Auth.signIn(username, password);
      console.log("Signed In", user)
      setStage('signedIn')

    }catch(err){
      console.log("Error signing up", err)
    }

  }



  return (
    <View style={{justifyContent:'center',padding:30, marginVertical:20 }}>

      <Text style={{fontSize:25,fontWeight:'bold',color:'orange',textAlign:"center"}}>AWS Authentication Login</Text>

      {
        stage === 'signUp' && (
          <>
            <Text style={{fontSize:25,fontWeight:'bold',color:'royalblue',textAlign:"center"}}>
            Sign Up</Text>

            <TextInput placeholder='Username' onChangeText={setUsername} />
            <TextInput placeholder='Email' onChangeText={setEmail} />
            <TextInput  placeholder='Password' onChangeText={setPassword} secureTextEntry/>

            <Button title='Sign Up' onPress={signUp} />
            <Button title='Go to Sign IN' onPress={()=>setStage("signIn")} />
            
          </>
        )
      }

      {
        stage === 'confirm' && (
          <>
            <Text style={{fontSize:25,fontWeight:'bold',color:'royalblue',textAlign:"center"}}>
            Confirm Sign Up</Text>

            <TextInput placeholder='Code' onChangeText={setCode} />

            <Button title='Confirm' onPress={confirm} />
            
          </>
        )
      }

      {
        stage === 'signIn' && (
          <>
            <Text style={{fontSize:25,fontWeight:'bold',color:'royalblue',textAlign:"center"}}>
            Sign In</Text>

            <TextInput placeholder='Username' onChangeText={setUsername} />
            <TextInput  placeholder='Password' onChangeText={setPassword} secureTextEntry/>

            <Button title='Sign IN' onPress={signIn}/>
            <Button title='Go to Sign UP' onPress={()=>setStage("signUp")} />
          </>
        )
      }

      {
        stage === 'signedIn' && (
          <>
            <Text style={{fontSize:25,fontWeight:'bold',color:'royalblue',textAlign:"center"}}>
            Welcome {username}</Text>
            
            <Button title='Go to Home Page' onPress={()=>setStage("signIn")} />
          </>
        )
      }
      
    </View>
  );
}

const styles = StyleSheet.create({

});
