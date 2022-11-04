import {React, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
const App = () => {
  const [FirstUserName, setFirstUserName] = useState('');
  const [SecondUserName, setSecondUserName] = useState('');
  const [Result, setResult] = useState('');
  const [Percentage, setPercentage] = useState('');
  const [temp_FirstUserName, setTemp_FirstUserName] = useState('');
  const [temp_SecondUserName, setTemp_SecondUserName] = useState('');
  const options = {
    method: 'GET',
    url: 'https://love-calculator.p.rapidapi.com/getPercentage',
    params: {sname: SecondUserName, fname: FirstUserName},
    headers: {
      'X-RapidAPI-Key': '2f96654e45mshe56a025f08b61c1p185ee7jsn91bf41be4d34',
      'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
    },
  };
  const Calculate = () => {
    if (FirstUserName.trim().length == 0 || SecondUserName.trim().length == 0) {
      alert('Please Enter Both Names');
      setFirstUserName('');
      setSecondUserName('');
      Keyboard.dismiss();
    } else {
      Keyboard.dismiss();
      axios
        .request(options)
        .then(response => {
          setPercentage(response.data.percentage);
          setResult(response.data.result);
        })
        .catch(function (error) {
          console.error(error);
        });
      setTemp_FirstUserName(FirstUserName);
      setTemp_SecondUserName(SecondUserName);
      setFirstUserName('');
      setSecondUserName('');
      setResult('');
      setPercentage('');
    }
  };

  const HeartSize = () => {
    if (Percentage >= 80) {
      return 90;
    } else if (Percentage >= 60) {
      return 80;
    } else if (Percentage >= 40) {
      return 70;
    } else if (Percentage >= 20) {
      return 60;
    } else {
      return 40;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <Text style={styles.title}>Love Calculator</Text>
          <TextInput
            placeholder="Enter First Name"
            style={styles.input}
            placeholderTextColor={'gray'}
            color={'#000'}
            onChangeText={text => setFirstUserName(text)}
            value={FirstUserName}
          />
          <TextInput
            placeholder="Enter Second Name"
            placeholderTextColor={'gray'}
            color={'#000'}
            style={styles.input}
            onChangeText={text => setSecondUserName(text)}
            value={SecondUserName}
          />
          <Text style={styles.text}>First Person : {temp_FirstUserName}</Text>
          <Text style={styles.text}>Second Person : {temp_SecondUserName}</Text>
          <Text style={[styles.text, {color: 'red'}]}>
            Love Percentage: {Percentage}
          </Text>
          <AntDesignIcon
            style={{
              alignSelf: 'center',
              marginVertical: 15,
              fontSize: Percentage == '' ? 0 : HeartSize(),
            }}
            name="heart"
            color={'red'}
          />
          <Text style={styles.text}>{Result}</Text>
          <View>
            <TouchableOpacity style={styles.button} onPress={Calculate}>
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
    color: '#1B659A',
    lineHeight: 40,
    fontFamily: 'MontserratSemibold',
    marginVertical: 30,
  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 21,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
    marginTop: 30,
    width: 200,
    alignSelf: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default App;
