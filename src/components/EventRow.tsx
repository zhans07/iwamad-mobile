
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CampusEvent } from '../data/events';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';

type EventRowProps = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export default function EventRow({
  event,
  saved,
  onPress,
  onToggleSaved,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>
              {saved ? 'Unsave' : 'Save'}
            </Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
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
      </Swipeable>

      {saved && (
        <Animated.Text
          entering={ZoomIn}
          style={styles.saved}
        >
          ★ Saved
        </Animated.Text>
      )}
    </Animated.View>
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
  saved: {
    color: '#16a34a',
    fontWeight: 'bold',
    marginLeft: 24,
    marginBottom: 8,
  },
  action: {
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    marginVertical: 7,
    marginRight: 16,
    borderRadius: 10,
    paddingHorizontal: 22,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
