import GlassPanel from '@/components/ui/GlassPanel';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CurveType, LineChart } from 'react-native-gifted-charts';
import { AppText } from '../ui/AppText';

type DataPoint = [string, number, number]; 

type HomeGraphProps = {
  data: DataPoint[];
};

const HomeGraph: React.FC<HomeGraphProps> = ({ data }) => {
  // Calculate the current nutrition percentage (using the last value from data)
  const currentNutrition = data.length > 0 ? data[data.length - 1][2] : 0;

  // Format the data for the LineChart component
  const formattedData = data.map((point, index) => {
    const [time, calories, nutrition] = point;
    return [
      {
        value: calories,
        dataPointText: "",
        time: time,
      },
      {
        value: nutrition,
        dataPointText: "",
        time: time,
        
      },
    ];
  }).flat();

  // Combine the points into the format expected by the LineChart
  const caloriesData = formattedData.filter((_, i) => i % 2 === 0);
  const nutritionData = formattedData.filter((_, i) => i % 2 === 1);

  return (
    <GlassPanel rounded="lg" contentContainerStyle={{ padding: 16 }}>
      <View className="flex-row">
        {/* Left Column - 1/3 width */}
        <View className="flex justify-between">
          <AppText variant="h4" weight="regular">All Nutrition</AppText>
          <View>
            <AppText weight="medium" style={styles.percentage}>{currentNutrition}%</AppText>
            <AppText variant="body1" style={styles.subtitle}>of all nutrition</AppText>
          </View>
        </View>

        {/* Right Column */}
        <View className="ml-3 items-center">
          <LineChart
            isAnimated
            thickness={2}
            curveType={CurveType.QUADRATIC}
            spacing={180 / (caloriesData.length)}
            
            curved
            curvature={0.4}
            data={caloriesData}
            data2={nutritionData}
            color="#333" // Dark grey for nutrition
            color2="#AAA" // Light grey for calories
            dataPointsColor1='#333'
            dataPointsColor2='#333'
            dataPointsRadius={2}
            rulesColor="lightgray"
            rulesType="solid"
            showVerticalLines
            verticalLinesColor="lightgray"
            verticalLinesStrokeDashArray={[0]}
            height={180}
            width={180}
            xAxisColor={"lightgray"}
            maxValue={100}
            stepValue={10}
            stepHeight={18}
            noOfSections={10}

            noOfVerticalLines={10}
            verticalLinesSpacing={18}
            hideYAxisText
            yAxisThickness={0}
            disableScroll
            focusEnabled
            dataPointLabelWidth={60}
            delayBeforeUnFocus={1000}
            focusedDataPointColor={'#333'}
            showDataPointLabelOnFocus={true}
            /* focusedDataPointLabelComponent={
                (selectedPoint: { time: string; nutrition: string; calories: string; }) => (
                    <View 
                        className="bg-gray-800 rounded-lg"
                        >
                        <Text className="text-white">Nutrition: {selectedPoint.nutrition}%</Text>
                        <Text className="text-white">Calories: {selectedPoint.calories}%</Text>
                    </View>
                )
            } */
          />
          
          {/* Legend */}
          <View className="flex-row items-center justify-center ml-4">
            <View className="flex-row items-center mr-4 bg-white rounded-full pt-1 pb-1 pl-3 pr-3">
              <View className="h-3 w-3 rounded-full bg-gray-400 mr-2" />
              <AppText variant="body2">Nutrition</AppText>
            </View>
            <View className="flex-row items-center bg-white rounded-full pt-1 pb-1 pl-3 pr-3">
              <View className="h-3 w-3 rounded-full bg-gray-800 mr-2" />
              <AppText variant="body2">Calories</AppText>
            </View>
          </View>
        </View>
      </View>
    </GlassPanel>
  );
};

const styles = StyleSheet.create({
  percentage: {
    fontSize: 60,
  },
  subtitle: {
    color: '#9ca3af', // Equivalent to text-gray-400
  },
});

export default HomeGraph;
