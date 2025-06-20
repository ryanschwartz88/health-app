import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, SplashScreen } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Welcome() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  SplashScreen.hide();
  
  const handleContinue = async () => {
    if (name.trim()) {
      setLoading(true);
      try {  
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // Store the name and navigate directly to your-goals
        router.push({
          pathname: '/onboarding/your-goals',
          params: { name }
        });
      } catch (error) {
        console.error('Error during onboarding:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#E7E3E2', '#DDDBE9']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: .75, y: .5 }}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <View style={styles.contentContainer}>
                <Text style={styles.headline}>
                  Let's personalize your health journey.
                </Text>
                
                <Text style={styles.subtext}>
                  We'll help you create a nutrition plan tailored to your unique needs.
                </Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>First, what's your name?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                  />
                </View>
              </View>
              
              <Pressable
                style={[styles.button, !name.trim() ? styles.buttonDisabled : null]}
                onPress={handleContinue}
                disabled={!name.trim() || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Let's Get Started</Text>
                )}
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 40,
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
    marginBottom: 16,
  },
  subtext: {
    fontSize: 18,
    color: '#333',
    marginBottom: 40,
    lineHeight: 26,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: 'white',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
