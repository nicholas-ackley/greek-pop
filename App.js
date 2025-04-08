import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import MainTabs from './MainTabs';
import { NavigationContainer } from '@react-navigation/native'; // ← add this at the top
import {getFirestore, doc, setDoc } from 'firebase/firestore';


//connecting firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9q_fGje80Nha5YtkUVCciJGbBe1id1cY",
  authDomain: "greek-77680.firebaseapp.com",
  projectId: "greek-77680",
  storageBucket: "greek-77680.firebasestorage.app",
  messagingSenderId: "718700298977",
  appId: "1:718700298977:web:e715c836eab92533472da0",
  measurementId: "G-QF0WNZB364"
};

//
const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, 
                    isLogin, setIsLogin, handleAuthentication, fullName, setFullName }) => {
  return (
    <View style={styles.authContainer}>
       <Text style={styles.title}>{isLogin ? 'Sign In' : 'Create Account'}</Text>
       {!isLogin && (
              <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
            />
       )}

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
 
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Create Account'} onPress={handleAuthentication} color="#3498db" />
        
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          
        </Text>
      </View>
    </View>
  );
}


// const AuthenticatedScreen = ({ user, handleAuthentication }) => {
//   return (
    
//     <View style={styles.authContainer}>
//       <Text style={styles.title}>Welcome</Text>
//       <Text style={styles.emailText}>{user.email}</Text>
//       <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
//     </View>
//   );
// };


//USESTATE VARIABLES
export default App = () => {
  const [fullName, setfullName ] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); //tracks whether someone is logged in, if null someone is logged 
  const [isLogin, setIsLogin] = useState(true);

  
//Grabbing auth from firebase for sign in and out
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => { //async meaning it takes time, usually awaiting for the database 
    try {
      if (user) {
        
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          //
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <NavigationContainer>
      {user ? (
        <MainTabs user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <AuthScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
          
        </ScrollView>
        
      )}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  nameContainer:{
    width: '80%',
    fontSize:18,


  }
});