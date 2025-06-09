import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native-web';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const VideoThumbnail = ({ video }) => {
  const [isLiked, setIsLiked] = useState(video.isLiked);
  const [likeCount, setLikeCount] = useState(video.likeCount);
  const [isPlaying, setIsPlaying] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);

    // Animation for like button
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  const formatCount = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      {/* Video Thumbnail/Player */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.videoContainer}
        onPress={() => setIsPlaying(!isPlaying)}
      >
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <View style={styles.playButton}>
            <Ionicons name="play" size={40} color="rgba(255,255,255,0.8)" />
          </View>
        )}
      </TouchableOpacity>

      {/* Video Info */}
      <View style={styles.videoInfo}>
        <Text style={styles.description} numberOfLines={2}>{video.description}</Text>

        <View style={styles.userInfo}>
          <Image source={{ uri: video.user.avatar }} style={styles.avatar} />
          <Text style={styles.username}>@{video.user.username}</Text>
        </View>
      </View>

      {/* Right Action Bar */}
      <View style={styles.actionBar}>
        {/* Like Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={30}
              color={isLiked ? '#fe2c55' : '#fff'}
            />
          </Animated.View>
          <Text style={styles.actionText}>{formatCount(likeCount)}</Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="commenting" size={28} color="#fff" />
          <Text style={styles.actionText}>{formatCount(video.commentCount)}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="share" size={30} color="#fff" />
          <Text style={styles.actionText}>{formatCount(video.shareCount)}</Text>
        </TouchableOpacity>

        {/* Music/Sound */}
        <View style={styles.soundContainer}>
          <View style={styles.soundIcon}>
            <MaterialCommunityIcons name="music-note" size={20} color="#fff" />
          </View>
        </View>
      </View>

      {/* Sound Label */}
      <View style={styles.soundLabel}>
        <Text style={styles.soundText} numberOfLines={1}>
          {video.soundName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: '100%',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    width: '70%',
  },
  description: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 8,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  actionBar: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  soundContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  soundIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundLabel: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    maxWidth: width * 0.7,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default VideoThumbnail;