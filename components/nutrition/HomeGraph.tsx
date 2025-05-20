import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type DataPoint = [string, number, number]; // [time, calories_percent, nutrition_percent]

type HomeGraphProps = {
  data: DataPoint[];
};

const HomeGraph: React.FC<HomeGraphProps> = ({ data }) => {
  const [selectedPoint, setSelectedPoint] = useState<{
    time: string;
    calories: number;
    nutrition: number;
    x: number;
    y: number;
  } | null>(null);

  // Calculate the current nutrition percentage (using the last value from data)
  const currentNutrition = data.length > 0 ? data[data.length - 1][2] : 0;

  // Format the data for the LineChart component
  const formattedData = data.map((point, index) => {
    const [time, calories, nutrition] = point;
    return [
      {
        value: calories,
        dataPointText: '',
        time: time,
        onPress: (x: number, y: number) => {
          setSelectedPoint({
            time,
            calories,
            nutrition,
            x,
            y,
          });
        },
      },
      {
        value: nutrition,
        dataPointText: '',
        time: time,
        onPress: (x: number, y: number) => {
          setSelectedPoint({
            time,
            calories,
            nutrition,
            x,
            y,
          });
        },
      },
    ];
  }).flat();

  // Combine the points into the format expected by the LineChart
  const caloriesData = formattedData.filter((_, i) => i % 2 === 0);
  const nutritionData = formattedData.filter((_, i) => i % 2 === 1);

  return (
    <View className="bg-gray-100 rounded-3xl p-6 w-full">
      <View className="flex-row">
        {/* Left Column */}
        <View className="flex-1 justify-between">
          <Text className="text-2xl font-bold">All Nutrition</Text>
          <View className="mb-4">
            <Text className="text-6xl font-bold">{currentNutrition}%</Text>
            <Text className="text-gray-400 text-lg">of all nutrition</Text>
          </View>
        </View>

        {/* Right Column - Chart */}
        <View className="flex-1">
          <LineChart
            thickness={3}
            data={nutritionData}
            data2={caloriesData}
            height={180}
            spacing={10}
            initialSpacing={0}
            color1="#333" // Dark grey for nutrition
            color2="#AAA" // Light grey for calories
            dataPointsColor1="#333"
            dataPointsColor2="#AAA"
            dataPointsRadius={5}
            showFractionalValues
            showVerticalLines
            showXAxisIndices
            xAxisIndicesHeight={3}
            xAxisIndicesColor="lightgray"
            yAxisColor="lightgray"
            yAxisThickness={1}
            horizontalRulesStyle={{
              strokeDashArray: [4, 4],
              color: 'lightgray',
            }}
            verticalLinesUptoDataPoint
            hideDataPoints1={selectedPoint !== null}
            hideDataPoints2={selectedPoint !== null}
          />

          {/* Legend */}
          <View className="flex-row justify-center mt-2">
            <View className="flex-row items-center mr-4">
              <View className="h-3 w-3 rounded-full bg-gray-800 mr-1" />
              <Text>Nutrition</Text>
            </View>
            <View className="flex-row items-center">
              <View className="h-3 w-3 rounded-full bg-gray-400 mr-1" />
              <Text>Calories</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Overlay for selected point */}
      {selectedPoint && (
        <View 
          className="absolute bg-gray-800 px-4 py-2 rounded-lg"
          style={{
            top: selectedPoint.y - 70,
            left: selectedPoint.x - 50,
          }}
        >
          <TouchableOpacity 
            className="absolute right-1 top-1" 
            onPress={() => setSelectedPoint(null)}
          >
            <Text className="text-white">×</Text>
          </TouchableOpacity>
          <Text className="text-white">{selectedPoint.time}</Text>
          <Text className="text-white">Nutrition: {selectedPoint.nutrition}%</Text>
          <Text className="text-white">Calories: {selectedPoint.calories}%</Text>
        </View>
      )}
    </View>
  );
};

export default HomeGraph;
