import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { 
  Pressable, 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboarding } from './_layout';

export default function WelcomeScreen() {
  const { data, updateData } = useOnboarding();
  const [name, setName] = useState(data.name || '');
  
  const handleContinue = () => {
    if (name.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      updateData({ name });
      router.push('/onboarding/your-goals');
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
                  Answer a few quick questions to tailor your goals, nutrients, and insights — takes less than a minute. Let's start by getting to know each other
                </Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.welcomeText}>Welcome!</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                    maxLength={30}
                  />
                </View>
              </View>

              <View style={styles.footer}>
                <Pressable
                  style={[styles.button, !name.trim() ? styles.buttonDisabled : null]}
                  onPress={handleContinue}
                  disabled={!name.trim()}
                >
                  <Text style={styles.buttonText}>Let's Get Started</Text>
                </Pressable>
              </View>
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
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
  },
  footer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
