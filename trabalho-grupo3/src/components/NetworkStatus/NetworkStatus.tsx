import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected === null || isConnected) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        SEM CONEXÃO COM INTERNET
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'red',
    padding:20,
  },
  status: {
    textAlign:"center",
    alignSelf:"center",
    fontSize: 18,
    color:"#ffffff",
    fontWeight: 'bold',
  },
});

export default NetworkStatus;