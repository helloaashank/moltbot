import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import PremiumBadge from '../components/PremiumBadge';

const CreateLetterScreen = ({ navigation }) => {
  const [recipientName, setRecipientName] = useState('');
  const [openWhenCondition, setOpenWhenCondition] = useState('');
  const [letterBody, setLetterBody] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const exampleConditions = [
    'You need a reminder of how loved you are',
    "It's your birthday",
    'You accomplished something big',
    "You're having a hard day",
    'You need to hear this',
  ];

  const handleSaveLetter = () => {
    // Validation
    if (!recipientName.trim()) {
      Alert.alert('Recipient Name', 'Please enter who this letter is for.');
      return;
    }
    if (!openWhenCondition.trim()) {
      Alert.alert('Open When Condition', 'Please describe when this letter should be opened.');
      return;
    }
    if (!letterBody.trim()) {
      Alert.alert('Letter Body', 'Please write your letter.');
      return;
    }
    if (!unlockDate) {
      Alert.alert('Unlock Date', 'Please select when this letter should unlock.');
      return;
    }

    // Check if unlock date is in the future
    const selectedDate = new Date(unlockDate);
    const now = new Date();
    if (selectedDate <= now) {
      Alert.alert('Future Date', 'Please select a future date for unlocking.');
      return;
    }

    setIsSaving(true);

    // Mock save - in real app, this would save to backend
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert(
        'Letter Saved',
        `Your letter for ${recipientName} will unlock on ${selectedDate.toLocaleDateString()}.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    }, 1500);
  };

  const handleSelectExample = (example) => {
    setOpenWhenCondition(example);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create a Letter</Text>
            <Text style={styles.subtitle}>
              Write something meaningful for the right moment.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Input
              label="Recipient Name"
              placeholder="Who is this letter for?"
              value={recipientName}
              onChangeText={setRecipientName}
            />

            <Input
              label="Open When..."
              placeholder="Describe the moment this letter should be opened"
              value={openWhenCondition}
              onChangeText={setOpenWhenCondition}
              multiline={false}
            />

            {/* Example suggestions */}
            {openWhenCondition.length === 0 && (
              <View style={styles.suggestions}>
                <Text style={styles.suggestionsLabel}>Inspiration:</Text>
                <View style={styles.suggestionChips}>
                  {exampleConditions.map((example, index) => (
                    <View
                      key={index}
                      style={styles.chip}
                    >
                      <Text
                        style={styles.chipText}
                        onPress={() => handleSelectExample(example)}
                      >
                        {example}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <Input
              label="Your Letter"
              placeholder="Write from the heart..."
              value={letterBody}
              onChangeText={setLetterBody}
              multiline
              style={styles.letterInput}
            />

            {/* Voice Note Placeholder - Premium Feature */}
            <View style={styles.voiceNoteContainer}>
              <View style={styles.voiceNoteRow}>
                <Text style={styles.voiceNoteLabel}>Add Voice Note</Text>
                <PremiumBadge icon="✨" text="Premium" />
              </View>
              <Text style={styles.voiceNoteDescription}>
                Record a personal voice message to accompany your letter.
              </Text>
              <Button
                title="🎤 Record Voice Note"
                onPress={() => Alert.alert('Premium Feature', 'Voice notes are available with OpenWhen Premium.')}
                variant="soft"
                size="small"
                disabled
              />
            </View>

            {/* Date Picker Placeholder */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Unlock Date</Text>
              <Text style={styles.dateDescription}>
                When should this letter become available?
              </Text>
              <Input
                placeholder="Select a date"
                value={unlockDate}
                onChangeText={setUnlockDate}
                keyboardType="default"
                style={styles.dateInput}
              />
              <Text style={styles.dateHint}>
                💡 Tip: Choose a meaningful date - a birthday, anniversary, or when you think they'll need this most.
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Save Letter"
              onPress={handleSaveLetter}
              variant="primary"
              size="large"
              loading={isSaving}
              style={styles.saveButton}
            />
            <Button
              title="Cancel"
              onPress={() => navigation.goBack()}
              variant="ghost"
              size="medium"
            />
          </View>
        </View>
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
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  form: {
    marginBottom: spacing.xl,
  },
  suggestions: {
    marginBottom: spacing.md,
  },
  suggestionsLabel: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  suggestionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipText: {
    fontSize: typography.sizes.xs,
    color: colors.textPrimary,
  },
  letterInput: {
    marginBottom: spacing.lg,
  },
  voiceNoteContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  voiceNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  voiceNoteLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
  voiceNoteDescription: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  dateContainer: {
    marginBottom: spacing.md,
  },
  dateLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  dateDescription: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  dateInput: {
    marginBottom: spacing.sm,
  },
  dateHint: {
    fontSize: typography.sizes.xs,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
});

export default CreateLetterScreen;
