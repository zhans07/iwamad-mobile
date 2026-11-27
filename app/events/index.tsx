
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [search, setSearch] = useState('');
  const { savedIds, toggleSaved } = useSavedIds();

  const {
    data: events = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useEvents();

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.message}>Loading events...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.errorMessage}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.savedCount}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() =>
              router.push({
                pathname: '/events/[id]',
                params: { id: String(item.id) },
              })
            }
            onToggleSaved={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No events match</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              void refetch();
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  message: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#dc2626',
  },
  errorMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedCount: {
    fontSize: 14,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    color: '#555',
  },
  search: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});
