import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
// import { WebView } from 'react-native-webview';

// const testDevoText = 'Title: Finding Hope in the Midst of Darkness

// Scripture: Psalm 42:11 (NIV) - "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God."

// Devotional:

// In the journey of life, we often encounter seasons of darkness and despair, moments when our souls seem downcast and our spirits troubled. Depression is a heavy burden that many people carry, and it can leave us feeling lost and disconnected from the world around us. But in these difficult times, we can find solace, hope, and healing in God's Word.

// Psalm 42:11 is a verse that speaks directly to those who are wrestling with depression. The psalmist asks their own soul, "Why are you downcast? Why are you disturbed within me?" It's a powerful reminder that even in the depths of despair, we can take a moment to reflect on our feelings and acknowledge our pain.

// But the psalmist doesn't stop there; they provide a solution that can be a source of encouragement for us today. They say, "Put your hope in God, for I will yet praise him, my Savior and my God." In the midst of depression, we have a choice to make. We can choose to fix our gaze on the pain, or we can choose to turn our eyes toward God, the source of our hope and salvation.

// Putting our hope in God doesn't mean that depression will magically disappear, but it means we can find strength and comfort in His presence. We can pour out our hearts to Him, knowing that He is our Savior and our refuge. In Him, we can find the hope that sustains us through the darkest nights and leads us toward the dawn of a new day.

// If you're struggling with depression, remember that you are not alone. Reach out to friends, family, or a professional who can offer support. But above all, reach out to God in prayer. Pour out your heart to Him, just as the psalmist did. Share your pain, your doubts, and your fears. And as you do, know that God is ready to offer His love and grace to heal your wounded spirit.

// Take some time today to meditate on Psalm 42:11 and consider the state of your soul. Are you downcast, disturbed, or burdened by depression? If so, choose to put your hope in God, for He is the source of true and lasting hope. In Him, you will find the strength to endure and the promise of brighter days ahead. Remember, you are loved, and there is hope even in the midst of darkness.'

const devoObject = [{
    "Title": "Finding Hope in the Midst of Darkness",
    "Scripture": "Psalm 42:11 (NIV) - \"Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.\"",
    "Devotional": "In the journey of life, we often encounter seasons of darkness and despair, moments when our souls seem downcast and our spirits troubled. Depression is a heavy burden that many people carry, and it can leave us feeling lost and disconnected from the world around us. But in these difficult times, we can find solace, hope, and healing in God's Word.<br><br> Psalm 42:11 is a verse that speaks directly to those who are wrestling with depression. The psalmist asks their own soul, \"Why are you downcast? Why are you disturbed within me?\" It's a powerful reminder that even in the depths of despair, we can take a moment to reflect on our feelings and acknowledge our pain.<br><br> But the psalmist doesn't stop there; they provide a solution that can be a source of encouragement for us today. They say, \"Put your hope in God, for I will yet praise him, my Savior and my God.\" In the midst of depression, we have a choice to make. We can choose to fix our gaze on the pain, or we can choose to turn our eyes toward God, the source of our hope and salvation.<br><br> Putting our hope in God doesn't mean that depression will magically disappear, but it means we can find strength and comfort in His presence. We can pour out our hearts to Him, knowing that He is our Savior and our refuge. In Him, we can find the hope that sustains us through the darkest nights and leads us toward the dawn of a new day.<br><br> If you're struggling with depression, remember that you are not alone. Reach out to friends, family, or a professional who can offer support. But above all, reach out to God in prayer. Pour out your heart to Him, just as the psalmist did. Share your pain, your doubts, and your fears. And as you do, know that God is ready to offer His love and grace to heal your wounded spirit.<br><br> Take some time today to meditate on Psalm 42:11 and consider the state of your soul. Are you downcast, disturbed, or burdened by depression? If so, choose to put your hope in God, for He is the source of true and lasting hope. In Him, you will find the strength to endure and the promise of brighter days ahead. Remember, you are loved, and there is hope even in the midst of darkness."
 }];

 const devObject2 = [{
    "Title": "Overcoming Fear with Faith",
    "Scripture": "2 Timothy 1:7 (NIV) - 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.'",
    "Devotional": "Fear is a powerful emotion that can paralyze us and keep us from living the life God intends for us. We all face moments of fear and uncertainty, whether it's fear of the unknown, fear of failure, or fear of what others may think. But the Bible reminds us that as believers, we are not called to live in fear.<br><br>2 Timothy 1:7 tells us that the Spirit God has given us is not a spirit of fear but a spirit of power, love, and self-discipline. In other words, God empowers us to overcome our fears. Instead of allowing fear to control our lives, we can tap into the power of the Holy Spirit dwelling within us.<br><br>When fear creeps in, we can turn to God in prayer and seek His guidance. We can ask for the strength and courage to face our fears head-on. God's love for us is a constant source of comfort and assurance. Knowing that we are loved by the Creator of the universe can cast out fear and replace it with faith.<br><br>Self-discipline is another essential tool in overcoming fear. It means controlling our thoughts, focusing on the truth of God's Word, and not allowing fear to run rampant in our minds. We can choose to dwell on God's promises, His faithfulness, and His ability to guide us through any situation.<br><br>As you face your fears today, remember that you have the Spirit of God within you. You have the power to overcome fear with faith, the love of a heavenly Father who cares for you, and the self-discipline to reject fear's grip on your life. Trust in God, and He will help you conquer your fears and lead you to a life of boldness and confidence in Him."
 }]

 const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
      fontSize: 20,
      marginLeft: 15,
      marginRight: 15
    },
    // a: {
    //   color: 'green'
    // }
  };

const personalDevotionPage = () => {
    const [loading, setLoading] = useState(true);
    const [devotionBody, setDevotionBody] = useState('');
    const { width } = useWindowDimensions();
    useEffect(() => {
        setDevotionBody(devObject2);
        setLoading(false);
        // Get AI DEVO HERE
        // fetch('http://10.0.0.13:3210/data')
        //   .then((resp) => resp.json())
        //   .then((json) => setData(json))
        //   .catch((error) => console.error(error))
        //   .finally(() => setLoading(false));
        console.log('devotionBody',devotionBody);
      }, []);
    
    // const devotionBody

    if(loading){
        return(
        
            <View style={[styles.devotionBodyLoadingView]}>
                <ActivityIndicator size="large" color="#C56E33" />
                
                <Text >
                    {'\n'}
                    {'\n'}
                    Loading Today's Devotion...
                </Text>
            </View>
            
        );
    }
    else{
        return(
        
            <ScrollView style={[styles.devotionBodyView]}>
                <Text style={[styles.devotionTitleText]}>
                    {devotionBody[0].Title}
                    {'\n'}
                </Text>
                <Text style={[styles.devotionScriptureText]}>
                    {devotionBody[0].Scripture}
                    {'\n'}
                </Text>
                
                {/* <Text>{devotionBody[0].Devotional}</Text> */}
                {/* <Text> */}
                    <RenderHtml
                        tagsStyles={tagsStyles}
                        contentWidth={width}
                        source={{html: devotionBody[0].Devotional}}
                    />
                {/* </Text> */}
                
                <Text>
                {'\n'}
                {'\n'}
                </Text>
                
            </ScrollView>
            
        );
    }
    
}

const styles = StyleSheet.create({
    devotionBodyView: {
      flex: 1,
    //   justifyContent: 'left',
    //   alignItems: 'left',
      marginTop: 22,
      backgroundColor: '#BCA37F',
    },
    devotionBodyLoadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: '#BCA37F',
      },
    renderHTML: {
        fontSize:25,
    },
    devotionTitleText: {
        fontSize:25,
        textAlign: 'center'
    },
    devotionScriptureText: {
        fontSize:20,
        textAlign: 'center',
        color: '#C56E33',
        fontStyle: 'italic',
        marginLeft: 15,
        marginRight: 15
    }

    
})

export default personalDevotionPage;