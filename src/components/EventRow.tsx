import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
};

export default function EventRow({
  event,
  onPress,
  onLongPress,
}: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>
          {event.date} · {event.place}
        </Text>
        <Text style={styles.seats}>Seats: {event.seats}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 44,
    justifyContent: 'center',
  },
  cardPressed: {
    backgroundColor: '#bfdbfe',
    borderColor: '#2563eb',
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  info: {
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  seats: {
    fontSize: 14,
    color: '#2563eb',
  },
});