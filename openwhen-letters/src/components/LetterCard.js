import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../theme/colors';

const LetterCard = ({ letter, onPress, showRecipient = true }) => {
  const {
    recipientName,
    senderName,
    openWhenCondition,
    isLocked,
    unlockDate,
  } = letter;

  const getStatusIcon = () => {
    return isLocked ? '🔒' : '✉️';
  };

  const getStatusText = () => {
    return isLocked ? 'Locked' : 'Ready to Open';
  };

  const getStatusColor = () => {
    return isLocked ? colors.locked : colors.opened;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.condition} numberOfLines={2}>
          Open When: {openWhenCondition}
        </Text>

        {showRecipient && (
          <Text style={styles.recipient}>
            For {recipientName}
          </Text>
        )}

        {!showRecipient && (
          <Text style={styles.sender}>
            From {senderName}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {isLocked ? `Unlocks: ${new Date(unlockDate).toLocaleDateString()}` : 'Available now'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statusIcon: {
    fontSize: typography.sizes.xs,
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
  },
  content: {
    marginBottom: spacing.sm,
  },
  condition: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  recipient: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  sender: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  date: {
    fontSize: typography.sizes.xs,
    color: colors.textLight,
  },
});

export default LetterCard;
