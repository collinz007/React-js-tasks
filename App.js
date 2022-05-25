import React, { useEffect, useState} from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TextInput,Button} from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [city, setCity]=useState('');
  const [weather, setWeather] = useState({});
  apikey = "0qw3SFuEpGm5NVlUuqxWPcCd5OErwFyD";

  const cityInputHandler=(enteredText)=>{
    setCity(enteredText);
  }

  const getCity = async () => {
    const baseUrl =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
    const queryParameters = `?apikey=${apikey}&q=${city}`;
    const response = await fetch(baseUrl + queryParameters);
    const data = await response.json();
    return data[0];
  };

  const getWeather = async (locationKey) => {
    const baseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
    const queryParameters = `${locationKey}?apikey=${apikey}`;
    const response = await fetch(baseUrl + queryParameters);
    const data = await response.json();
    return data[0];
  };

  useEffect(() => {
    getCity();
    getWeather();
  }, []);

  const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const cityWeather = await getWeather(cityDetails.Key);
  
    return { cityDetails, cityWeather };
  };
  const { cityDetails, cityWeather } = data;
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput placeholder="city" style={styles.input} onChangeText={cityInputHandler}/>
        <Button title="Find" onPress={updateCity}/>
      </View>
      <View>
      <Text>${cityDetails.Country.EnglishName}</Text>
      <Text>${cityWeather.Temperature.Metric.Value}</Text>
      </View>
   </View>
  );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
   backgroundColor: '#fff',    alignItems: 'center',
   justifyContent: 'center',
    },
   });