import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo placeholder */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <View style={styles.logoIcon}></View>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.primaryButton} onPress={onLogin}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton}>
              <View style={styles.googleIcon}></View>
              <Text style={styles.secondaryButtonText}>Continue with Google</Text>
            </Pressable>
          </View>

          {/* Forgot password link */}
          <View style={styles.forgotPasswordContainer}>
            <Pressable>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // bg-background
    paddingHorizontal: 24, // px-6 equivalent
    paddingVertical: 32, // py-8 equivalent
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 384, // max-w-sm equivalent
    alignSelf: 'center',
    gap: 32, // space-y-8 equivalent
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#ECECF0', // bg-muted
    borderRadius: 12, // rounded-lg
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logoIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#424242', // bg-primary - using iOS blue
    borderRadius: 6,
    opacity: 0.2,
  },
  form: {
    gap: 24, // space-y-6 equivalent
  },
  inputGroup: {
    gap: 16, // space-y-4 equivalent
  },
  inputContainer: {
    gap: 8, // space-y-2 equivalent
  },
  label: {
    color: '#000000', // text-foreground
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 48, // h-12
    backgroundColor: '#f8f9fa', // bg-input-background
    borderWidth: 1,
    borderColor: '#d1d5db', // border-border
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
  },
  buttonsContainer: {
    gap: 12, // space-y-3 equivalent
  },
  primaryButton: {
    height: 48, // h-12
    backgroundColor: '#030213', // bg-primary
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff', // text-primary-foreground
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    height: 48, // h-12
    backgroundColor: '#ffffff', // bg-background
    borderWidth: 1,
    borderColor: '#d1d5db', // border-border
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  secondaryButtonText: {
    color: '#000000', // text-foreground
    fontSize: 16,
    fontWeight: '500',
  },
  googleIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#f3f4f6', // bg-muted
    borderRadius: 4,
    marginRight: 12, // mr-3 equivalent
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#6b7280', // text-muted-foreground
    fontSize: 14,
  },
});