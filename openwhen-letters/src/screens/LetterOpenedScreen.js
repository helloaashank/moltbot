import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Animated } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/colors';
import Button from '../components/Button';
import PremiumBadge from '../components/PremiumBadge';

const LetterOpenedScreen = ({ route, navigation }) => {
  const { letter } = route.params || {};
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(20));
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // Staggered entrance animations
    const sequence = Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]);
    sequence.start();

    setIsOpened(true);
  }, []);

  if (!letter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>No letter found</Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="primary"
          />
        </View>
      </SafeAreaView>
    );
  }

  const openDate = new Date();
  const unlockDate = new Date(letter.unlockDate);
  const wasUnlockedOnTime = openDate >= unlockDate;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Opening Animation Icon */}
          <View style={styles.header}>
            <View style={styles.envelopeContainer}>
              <Text style={styles.envelopeIcon}>✨</Text>
            </View>
            <Text style={styles.openedBadge}>Opened</Text>
          </View>

          {/* Recipient Header */}
          <View style={styles.recipientHeader}>
            <Text style={styles.forLabel}>For</Text>
            <Text style={styles.recipientName}>{letter.recipientName}</Text>
            <Text style={styles.senderLabel}>
              From {letter.senderName}
            </Text>
          </View>

          {/* Open When Condition */}
          <View style={styles.conditionContainer}>
            <Text style={styles.conditionLabel}>Open When...</Text>
            <Text style={styles.conditionText}>{letter.openWhenCondition}</Text>
          </View>

          {/* Decorative Divider */}
          <View style={styles.divider} />

          {/* Letter Body - The Main Content */}
          <View style={styles.letterBodyContainer}>
            <ScrollView
              nestedScrollEnabled={true}
              scrollEnabled={false}
            >
              <Text style={styles.letterBody}>
                {letter.body}
              </Text>
            </ScrollView>
          </View>

          {/* Voice Note Placeholder - Premium */}
          {letter.hasVoiceNote && (
            <View style={styles.voiceNoteContainer}>
              <View style={styles.voiceNoteRow}>
                <View style={styles.voiceNoteInfo}>
                  <Text style={styles.voiceNoteTitle}>🎵 Voice Message</Text>
                  <Text style={styles.voiceNoteSubtitle}>
                    A personal recording from {letter.senderName}
                  </Text>
                </View>
                <PremiumBadge icon="✨" text="Premium" />
              </View>
              <Button
                title="▶️ Play Voice Message"
                onPress={() => Alert.alert('Premium Feature', 'Voice messages are available with OpenWhen Premium.')}
                variant="soft"
                size="small"
                style={styles.voiceNoteButton}
              />
            </View>
          )}

          {/* Timestamp */}
          <View style={styles.timestampContainer}>
            <Text style={styles.timestampLabel}>
              {wasUnlockedOnTime ? 'Unlocked on time' : 'Opened early'}
            </Text>
            <Text style={styles.timestamp}>
              {openDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {!wasUnlockedOnTime && (
              <Text style={styles.earlyNote}>
                You opened this letter before its intended time. {'\n'}
                Sometimes the right moment is now.
              </Text>
            )}
          </View>

          {/* Closing Reflection */}
          <View style={styles.reflectionContainer}>
            <Text style={styles.reflectionText}>
              Some words find us exactly when we need them.
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionContainer}>
            <Button
              title="Back to Dashboard"
              onPress={() => navigation.navigate('Dashboard')}
              variant="primary"
              size="large"
              style={styles.backButton}
            />
            <Button
              title="Write a Letter Back"
              onPress={() => navigation.navigate('CreateLetter', {
                recipientName: letter.senderName
              })}
              variant="secondary"
              size="medium"
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  envelopeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelopeIcon: {
    fontSize: 32,
  },
  openedBadge: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.opened,
    backgroundColor: 'rgba(168, 196, 160, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  recipientHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  forLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  recipientName: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  senderLabel: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  conditionContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  conditionLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  conditionText: {
    fontSize: typography.sizes.lg,
    color: colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: typography.sizes.xl,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
  letterBodyContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 200,
  },
  letterBody: {
    fontSize: typography.sizes.md,
    lineHeight: typography.sizes.xl,
    color: colors.textPrimary,
    fontWeight: typography.weights.regular,
  },
  voiceNoteContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  voiceNoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  voiceNoteInfo: {
    flex: 1,
  },
  voiceNoteTitle: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  voiceNoteSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  voiceNoteButton: {
    marginTop: spacing.xs,
  },
  timestampContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timestampLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  timestamp: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
  },
  earlyNote: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: spacing.sm,
    lineHeight: typography.sizes.md,
  },
  reflectionContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  reflectionText: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
});

export default LetterOpenedScreen;
