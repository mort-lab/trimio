import { Tabs } from "expo-router";
import React, { useMemo } from "react";
import {
  View,
  Pressable,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { icons } from "@/constants";
import MapScreen from "./map";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TabIconProps {
  source: ImageSourcePropType;
  focused: boolean;
  label: string;
  tintColor: string;
}

const TabIcon: React.FC<TabIconProps> = ({
  source,
  focused,
  label,
  tintColor,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      focused ? 1 : 0,
      [0, 1],
      ["transparent", "rgba(255, 255, 255, 0.2)"]
    );

    return {
      backgroundColor,
      transform: [{ scale: withSpring(focused ? 1.1 : 1) }],
    };
  });

  return (
    <Animated.View
      style={[styles.iconContainer, animatedStyle]}
      accessibilityLabel={label}
    >
      <Image
        source={source}
        tintColor={tintColor}
        resizeMode="contain"
        style={styles.icon}
      />
      <Text style={[styles.label, { color: tintColor }]}>{label}</Text>
    </Animated.View>
  );
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const tabBarStyle = useMemo(
    () => [
      styles.tabBar,
      { paddingBottom: Platform.OS === "ios" ? insets.bottom : 10 },
    ],
    [insets.bottom]
  );

  return (
    <View style={tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <AnimatedPressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <TabIcon
              source={
                options.tabBarIcon?.({
                  focused: isFocused,
                  color: "",
                  size: 24,
                }) as ImageSourcePropType
              }
              focused={isFocused}
              label={label}
              tintColor={isFocused ? "#FFFFFF" : "#CCCCCC"}
            />
          </AnimatedPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#333333",
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 10,
    paddingTop: 10,
    height: 80,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  iconContainer: {
    borderRadius: 20,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#CCCCCC",
        tabBarShowLabel: true,
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => icons.home,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => icons.home,
        }}
      />

      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ focused }) => icons.chat,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => icons.profile,
        }}
      />
    </Tabs>
  );
}
