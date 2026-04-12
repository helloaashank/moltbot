import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/colors';
import Button from '../components/Button';

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo / App Name */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>✉️</Text>
          <Text style={styles.appName}>OpenWhen Letters</Text>
        </View>

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            Some words are meant for {'\n'}
            <Text style={styles.taglineHighlight}>the right moment.</Text>
          </Text>
          <Text style={styles.subTagline}>
            Create time-locked letters for the people who matter most.
          </Text>
        </View>

        {/* Decorative Element */}
        <View style={styles.decorativeLine} />

        {/* CTAs */}
        <View style={styles.ctaContainer}>
          <Button
            title="Create a Letter"
            onPress={() => navigation.navigate('CreateLetter')}
            variant="primary"
            size="large"
            style={styles.ctaButton}
          />

          <Button
            title="Open a Letter"
            onPress={() => navigation.navigate('Dashboard')}
            variant="secondary"
            size="large"
            style={styles.ctaButton}
          />
        </View>

        {/* Dashboard Preview */}
        <View style={styles.dashboardPreview}>
          <Button
            title="View Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
            variant="ghost"
            size="small"
          />
        </View>
      </View>

      {/* Bottom Decoration */}
      <View style={styles.bottomDecoration}>
        <Text style={styles.bottomText}>Made with love</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  tagline: {
    fontSize: typography.sizes.lg,
    lineHeight: typography.sizes.xl,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: typography.weights.regular,
  },
  taglineHighlight: {
    fontStyle: 'italic',
    color: colors.primary,
  },
  subTagline: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  decorativeLine: {
    width: 60,
    height: 2,
    backgroundColor: colors.primaryLight,
    marginVertical: spacing.xl,
    alignSelf: 'center',
  },
  ctaContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  ctaButton: {
    marginBottom: spacing.md,
  },
  dashboardPreview: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  bottomDecoration: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: typography.sizes.xs,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});

export default LandingScreen;
