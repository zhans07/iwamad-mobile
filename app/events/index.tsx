
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSaved = (id: number) => {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search events..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <EventRow
              event={item}
              onPress={() =>
                router.push({
                  pathname: '/events/[id]',
                  params: { id: String(item.id) },
                })
              }
              onLongPress={() => toggleSaved(item.id)}
            />
            {savedIds.includes(item.id) && (
              <Text style={styles.saved}>★ Saved</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No events match</Text>
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
  search: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  saved: {
    color: '#16a34a',
    fontWeight: 'bold',
    marginLeft: 24,
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});
