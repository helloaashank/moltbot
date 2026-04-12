import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../theme/colors';

const PremiumBadge = ({ icon = '✨', text = 'Premium', size = 'small' }) => {
  return (
    <View style={[styles.badge, styles[size]]}>
      <Text style={[styles.icon, styles[size]]}>{icon}</Text>
      <Text style={[styles.text, styles[size]]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.premium,
    borderRadius: borderRadius.full,
    opacity: 0.9,
  },
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  medium: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  icon: {
    marginRight: spacing.xs,
  },
  text: {
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
  },
  'small-text': {
    fontSize: typography.sizes.xs,
  },
  'medium-text': {
    fontSize: typography.sizes.sm,
  },
});

export default PremiumBadge;
