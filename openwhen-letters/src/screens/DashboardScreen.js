import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/colors';
import { mockLetters } from '../data/mockLetters';
import LetterCard from '../components/LetterCard';
import Button from '../components/Button';

const DashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Letters' },
    { id: 'created', label: 'Created' },
    { id: 'received', label: 'Received' },
  ];

  const getFilteredLetters = () => {
    switch (activeTab) {
      case 'created':
        return mockLetters.filter(letter => letter.isFromCurrentUser);
      case 'received':
        return mockLetters.filter(letter => !letter.isFromCurrentUser);
      default:
        return mockLetters;
    }
  };

  const filteredLetters = getFilteredLetters();
  const lockedCount = mockLetters.filter(l => l.isLocked).length;
  const openedCount = mockLetters.filter(l => !l.isLocked).length;

  const handleLetterPress = (letter) => {
    if (letter.isLocked) {
      navigation.navigate('LetterLocked', { letter });
    } else {
      navigation.navigate('LetterOpened', { letter });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Your Letters</Text>
          <Text style={styles.subGreeting}>
            {lockedCount} locked, {openedCount} ready to open
          </Text>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateLetter')}
        >
          <Text style={styles.createButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🔒</Text>
          <Text style={styles.statValue}>{lockedCount}</Text>
          <Text style={styles.statLabel}>Locked</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>✉️</Text>
          <Text style={styles.statValue}>{openedCount}</Text>
          <Text style={styles.statLabel}>Opened</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📝</Text>
          <Text style={styles.statValue}>{mockLetters.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Letters List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredLetters.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No letters yet</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'created'
                ? "You haven't created any letters."
                : activeTab === 'received'
                ? "You haven't received any letters."
                : "Your letter box is empty."}
            </Text>
            <Button
              title="Create Your First Letter"
              onPress={() => navigation.navigate('CreateLetter')}
              variant="primary"
              size="medium"
              style={styles.emptyButton}
            />
          </View>
        ) : (
          filteredLetters.map(letter => (
            <LetterCard
              key={letter.id}
              letter={letter}
              onPress={() => handleLetterPress(letter)}
              showRecipient={!letter.isFromCurrentUser}
            />
          ))
        )}
      </ScrollView>

      {/* Quick Create FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateLetter')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>✏️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  subGreeting: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: typography.weights.medium,
    marginTop: -2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  statIcon: {
    fontSize: typography.sizes.lg,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyButton: {
    minWidth: 200,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 24,
    marginTop: -2,
  },
});

export default DashboardScreen;
