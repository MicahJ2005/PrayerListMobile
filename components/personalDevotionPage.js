import {Switch} from 'native-base';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, StyleSheet, Pressable, Alert,FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import {API_KEY, BASE_URL_DEV} from '@env';

const depression = [{
    "Title": "Finding Hope in the Midst of Darkness",
    "Scripture": "Psalm 42:11 (NIV) - \"Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.\"",
    "Devotional": "In the journey of life, we often encounter seasons of darkness and despair, moments when our souls seem downcast and our spirits troubled. Depression is a heavy burden that many people carry, and it can leave us feeling lost and disconnected from the world around us. But in these difficult times, we can find solace, hope, and healing in God's Word.<br><br> Psalm 42:11 is a verse that speaks directly to those who are wrestling with depression. The psalmist asks their own soul, \"Why are you downcast? Why are you disturbed within me?\" It's a powerful reminder that even in the depths of despair, we can take a moment to reflect on our feelings and acknowledge our pain.<br><br> But the psalmist doesn't stop there; they provide a solution that can be a source of encouragement for us today. They say, \"Put your hope in God, for I will yet praise him, my Savior and my God.\" In the midst of depression, we have a choice to make. We can choose to fix our gaze on the pain, or we can choose to turn our eyes toward God, the source of our hope and salvation.<br><br> Putting our hope in God doesn't mean that depression will magically disappear, but it means we can find strength and comfort in His presence. We can pour out our hearts to Him, knowing that He is our Savior and our refuge. In Him, we can find the hope that sustains us through the darkest nights and leads us toward the dawn of a new day.<br><br> If you're struggling with depression, remember that you are not alone. Reach out to friends, family, or a professional who can offer support. But above all, reach out to God in prayer. Pour out your heart to Him, just as the psalmist did. Share your pain, your doubts, and your fears. And as you do, know that God is ready to offer His love and grace to heal your wounded spirit.<br><br> Take some time today to meditate on Psalm 42:11 and consider the state of your soul. Are you downcast, disturbed, or burdened by depression? If so, choose to put your hope in God, for He is the source of true and lasting hope. In Him, you will find the strength to endure and the promise of brighter days ahead. Remember, you are loved, and there is hope even in the midst of darkness."
 }];

 const fear = [{
    "Title": "Overcoming Fear with Faith",
    "Scripture": "2 Timothy 1:7 (NIV) - 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.'",
    "Devotional": "Fear is a powerful emotion that can paralyze us and keep us from living the life God intends for us. We all face moments of fear and uncertainty, whether it's fear of the unknown, fear of failure, or fear of what others may think. But the Bible reminds us that as believers, we are not called to live in fear.<br><br>2 Timothy 1:7 tells us that the Spirit God has given us is not a spirit of fear but a spirit of power, love, and self-discipline. In other words, God empowers us to overcome our fears. Instead of allowing fear to control our lives, we can tap into the power of the Holy Spirit dwelling within us.<br><br>When fear creeps in, we can turn to God in prayer and seek His guidance. We can ask for the strength and courage to face our fears head-on. God's love for us is a constant source of comfort and assurance. Knowing that we are loved by the Creator of the universe can cast out fear and replace it with faith.<br><br>Self-discipline is another essential tool in overcoming fear. It means controlling our thoughts, focusing on the truth of God's Word, and not allowing fear to run rampant in our minds. We can choose to dwell on God's promises, His faithfulness, and His ability to guide us through any situation.<br><br>As you face your fears today, remember that you have the Spirit of God within you. You have the power to overcome fear with faith, the love of a heavenly Father who cares for you, and the self-discipline to reject fear's grip on your life. Trust in God, and He will help you conquer your fears and lead you to a life of boldness and confidence in Him."
 }]

 const strength =[{
    "Title": "Strength in the Lord",
    "Scripture": "Isaiah 40:31 (NIV) - 'but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.'",
    "Devotional": "Life often presents us with challenges that test our strength, both physically and spiritually. In those moments, it's easy to feel weak, weary, and burdened. But as believers, we have a promise in the Bible that reminds us where true strength comes from.<br><br>Isaiah 40:31 tells us that when we place our hope in the Lord, our strength will be renewed. It's a beautiful picture of God's sustaining power. Just as eagles soar effortlessly on the wind, God enables us to rise above our difficulties and challenges. When we trust in Him, we find the strength to keep going even when the path seems long and exhausting.<br><br>God's strength is not limited to extraordinary moments but is with us every day. When we run, we won't grow weary, and when we walk, we won't be faint. This means that God's strength is available in our most ordinary tasks and in our most challenging trials.<br><br>So, where do you find your strength today? Is it in your own abilities, or is it in the Lord? Take a moment to put your hope in Him. Pray for His strength to sustain you and carry you through whatever you're facing. Trust that He will provide the endurance and resilience you need.<br><br>As you go about your day, remember that true strength is found in the Lord. Rely on His power, and you will find the ability to soar above life's challenges, run the race set before you, and walk in His grace without growing faint."
 }]

 const jobLoss = [{
        "Title": "Finding Hope After Job Loss",
        "Scripture": "Jeremiah 29:11 (NIV) - 'For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.'",
        "Devotional": "Job loss can be a devastating and disheartening experience, leaving us feeling lost and uncertain about the future. In such times of distress, it's important to remember that God has a plan for each one of us, even when we face unexpected setbacks.<br><br>Jeremiah 29:11 provides a reassuring promise from the Lord: 'For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.' Even in the midst of adversity, God's plans for our lives remain intact. He has a purpose for us that goes beyond our current circumstances.<br><br>When you lose your job, it's easy to focus on the immediate challenges and uncertainties. But God's perspective is broader. He sees a future filled with hope and opportunities that you may not yet discern. This period of transition can be an invitation to seek God's guidance and align your path with His divine purpose.<br><br>While the journey through job loss may be difficult, it's also a chance to lean on God's wisdom, strength, and provision. He is a faithful God who walks with you through every trial. Trust that He is at work in your life, orchestrating a future that aligns with His best intentions for you.<br><br>Take this time to pray, seek His guidance, and trust in His promise. God's plans for you are filled with hope, and your future remains in His capable and caring hands. As you navigate the challenges of job loss, remember that He has a purpose and a path uniquely designed for you."
     }]

 const loss =[{
    "Title": "Finding Comfort in Times of Loss",
    "Scripture": "Psalm 34:18 (NIV) - 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.'",
    "Devotional": "Loss is an inevitable part of life. Whether it's the loss of a loved one, a job, a relationship, or something dear to your heart, it can leave you feeling broken and overwhelmed. During these difficult times, it's crucial to remember that God is near to those who are hurting.<br><br>Psalm 34:18 reassures us of this truth: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' In moments of profound loss, God draws near to us with His comforting presence. He understands our pain and offers solace to the wounded heart.<br><br>When you experience loss, it's normal to feel a range of emotions, including grief, sadness, and even anger. These feelings are part of the healing process. God doesn't expect you to hide your pain or put on a facade. Instead, He invites you to bring your brokenness to Him.<br><br>As you grieve, pour out your heart to God in prayer. Share your sorrows, your questions, and your longing for comfort. Trust that He is with you in the midst of your pain, offering a sense of peace that surpasses understanding.<br><br>While loss can be agonizing, it can also be an opportunity to grow closer to God. In your brokenness, you may discover a deeper reliance on His grace and a newfound understanding of His compassion. God's promise is that He saves those who are crushed in spirit. He brings healing to the wounded heart and restoration to the broken soul.<br><br>May you find comfort in the knowledge that God is near in your times of loss. As you navigate the journey of healing and recovery, let your faith be your anchor, and trust that the One who is close to the brokenhearted will mend your spirit and lead you toward a place of peace and hope."
 }]

 const sickness = [{
    "Title": "Finding Healing and Hope in Sickness",
    "Scripture": "Psalm 41:3 (NIV) - 'The Lord sustains them on their sickbed and restores them from their bed of illness.'",
    "Devotional": "Sickness can be a challenging and disheartening experience, often leaving us feeling weak and vulnerable. During such times, it's essential to remember that God offers us healing and hope, even in the midst of illness.<br><br>Psalm 41:3 provides a promise of comfort and restoration: 'The Lord sustains them on their sickbed and restores them from their bed of illness.' When we are sick, God sustains us, offering the strength we need to endure and recover.<br><br>Illness can be physically and emotionally draining, but it's in these moments that we can turn to God for His healing touch. He is the ultimate healer, and His power can work miracles in our lives. Our faith can be a powerful catalyst for the restoration of our health.<br><br>While going through sickness, it's essential to draw near to God in prayer. Seek His guidance, His strength, and His comfort. Trust that He is with you, providing the care and support you need during this challenging time.<br><br>Remember that healing is not always immediate, and it may not always take the form we expect. But God's promise is clear - He restores. He can bring you back to health, and He can also bring you spiritual and emotional restoration, even as you face physical challenges.<br><br>As you navigate the difficulties of sickness, maintain your hope in the Lord. Place your trust in His sustaining power, and let His love and grace fill your heart with hope. In sickness, God offers us a chance to draw closer to Him and to experience His restoration and healing, not just in our bodies but in our souls as well."
 }]

 const parenting = [{
    "Title": "Parenting with Wisdom and Love",
    "Scripture": "Proverbs 22:6 (NIV) - 'Start children off on the way they should go, and even when they are old, they will not turn from it.'",
    "Devotional": "Parenting is a remarkable journey filled with challenges and joys, and it's a role that carries great responsibility. The Bible provides guidance on raising children with wisdom and love, starting with Proverbs 22:6: 'Start children off on the way they should go, and even when they are old, they will not turn from it.'<br><br>These words from the book of Proverbs remind us of the importance of teaching our children the values and principles of a godly life. As parents, we have the privilege and duty to shape the character and faith of our children.<br><br>One of the most effective ways to do this is by setting a godly example. Children often learn more from what they see us do than from what we tell them to do. Demonstrating love, kindness, forgiveness, and faith in our own lives can be a powerful influence on our children's spiritual development.<br><br>Additionally, nurturing open communication with our children is vital. Encourage them to ask questions, express their thoughts, and share their concerns. This creates an environment where they can learn about faith, values, and life from a place of trust and understanding.<br><br>It's also crucial to pray for your children. Commit their well-being, growth, and spiritual journey to God in prayer. Seek His guidance in the decisions you make as a parent, and trust that He will provide the wisdom and strength you need.<br><br>Remember, parenting is a lifelong journey, and the impact of your guidance may not always be immediately visible. But have faith that as you lead your children on the right path, teaching them about God's love and grace, you are planting seeds that will grow and bear fruit in their lives.<br><br>May you parent with wisdom and love, leaning on God's guidance and trusting in His promise that your efforts to guide your children on the path of faith will not be in vain."
 }]

 const spiritualGrowth = [{
    "Title": "Cultivating Spiritual Growth",
    "Scripture": "2 Peter 3:18 (NIV) - 'But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To Him be glory both now and forever! Amen.'",
    "Devotional": "Spiritual growth is a journey, a path of continuous transformation, and an ongoing process of becoming more like Christ. In 2 Peter 3:18, we are encouraged to 'grow in the grace and knowledge of our Lord and Savior Jesus Christ.'<br><br>As believers, we are called not to remain stagnant but to actively pursue a deeper relationship with Christ. This growth involves increasing in our understanding of His grace and knowledge. The more we learn about Jesus and His teachings, the more we can emulate His character and live in alignment with His will.<br><br>One way to foster spiritual growth is through regular prayer and meditation on God's Word. Spend time in His presence, seeking His guidance, and asking for wisdom and strength. The Bible is a rich source of wisdom and knowledge, and it's through Scripture that we can better grasp the nature and purpose of our faith.<br><br>Another crucial aspect of spiritual growth is community. Engage with fellow believers, attend worship services, join small groups, and share your faith journey. Through interactions with others, we can learn from one another, provide support, and encourage growth together.<br><br>Embrace challenges and trials as opportunities for spiritual growth. God often refines us in the crucible of adversity, shaping our character and deepening our faith. In moments of difficulty, remember that God is using them to mold you into the image of His Son.<br><br>In your pursuit of spiritual growth, be patient with yourself. Growth takes time and effort. There will be seasons of rapid progress and seasons of apparent stagnation, but God is always at work in your life.<br><br>As you strive to 'grow in the grace and knowledge of our Lord and Savior Jesus Christ,' may you find joy in the journey of spiritual growth. May your life be a testament to His transforming power, bringing glory to His name now and forever. Amen."
 }]

 const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: 'black',
      fontSize: 20,
      marginLeft: 15,
      marginRight: 15
    },
  };

const personalDevotionPage = (devoTypeselected) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [devotionBody, setDevotionBody] = useState('');
    const [devotionTitle, setDevotionTitle] = useState('');
    const [devotionScripture, setDevotionScripture] = useState('');
    const { width } = useWindowDimensions();

    useEffect(() => {
        console.log('personalDevotionPage devoTypeselected.selected= ', devoTypeselected.selected);
        console.log('runningUser in personalDevotionPage:', devoTypeselected.runningUser[0]);
        console.log('personalDevotionPage devoTypeselected.devotionTopicText= ', devoTypeselected.devotionTopicText);
        console.log('APIKEY: ', API_KEY);
        // setDevotionTitle("Embracing the Journey: Finding Meaning in the Unknown");
        // setDevotionScripture("Train up a child in the way he should go; even when he is old he will not depart from it.\" - Proverbs 22:6");
        // setDevotionBody("In life, we often find ourselves on a journey, navigating through the unknown. This journey is not always easy, and it can be filled with uncertainties and challenges. However, as believers, we are called to embrace this journey and seek meaning in the midst of the unknown. The scripture in Proverbs 22:6 reminds us of the importance of training up a child in the way they should go. This verse not only applies to literal children but can also be applied to our own lives as we navigate through our personal journeys. Just as a child needs guidance and direction, we too need to seek wisdom and understanding in order to find meaning in the unknown.' Embracing the journey means acknowledging that we do not have all the answers and that we are constantly learning and growing. It means surrendering our need for control and instead placing our trust in God. As we embrace the journey, we discover that God has a purpose and a plan for our lives, even in the midst of the unknown. Finding meaning in the unknown requires us to have faith and trust in God\'s sovereignty. We can take comfort in knowing that God is with us every step of the way, even when we cannot see the road ahead. He is the one who goes before us, paving the way and guiding us through the uncertainties of life. When we encounter challenges and uncertainties, we can turn to God\'s Word for guidance and encouragement. Just as a child looks to their parents for guidance, we can look to our Heavenly");
        
        // getDevoDB();
        getAIDevo(devoTypeselected)
    }, []);

       
    
    const testDevoToDB = () => {
        console.log('IN testDevoToDB');
        fetch(`${BASE_URL_DEV}/data/postdailydevo`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: 'Hi there'
            }),
          })
        .then((response) =>{
            console.log('response', response);
        //   loadData();
        //   Alert.alert('Prayer Request Submitted!');
        //   setModalVisible(false);
        })
    }

    const getAIDevo = async (devoType) => {
    console.log('personalDevotionPage getAIDevo devoType', devoType);
    console.log('personalDevotionPage getAIDevo.selected= ', devoType.selected);
    console.log('personalDevotionPage devoTypeselected.devotionTopicText= ', devoTypeselected.devotionTopicText);
    console.log('runningUser in getAIDevo:', devoType.runningUser[0]);
    const response = await fetch(`${BASE_URL_DEV}/data/checktodaysdevo?userid=${devoType.runningUser[0].id}`)
    const jsonDevotion = await response.json();  
    console.log('jsonDevotion', jsonDevotion);
    console.log('jsonDevotion size', jsonDevotion.length);
    if(jsonDevotion.length > 0){
        setDevotionTitle(jsonDevotion[0].title);
        setDevotionScripture(jsonDevotion[0].scripture);
        setDevotionBody(jsonDevotion[0].body);
        setLoading(false);
    }
    else{
        console.log('no devo yet today... Generating');
    
        try {
            let contentToSend = `"Provide just a Bible verse about ${devoType.devotionTopicText}"`;
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{"role": "user", "content": contentToSend}],
                    max_tokens: 300,
                    temperature: 0.7,
                }),
            
            })
            const jsonScripture = await response.json(); 
                console.log("this is the result devotionScripture", jsonScripture); 
                setDevotionScripture(jsonScripture.choices[0].message.content);
                console.log("this is the result devotionScripture", jsonScripture.choices[0].message.content);
            if(jsonScripture.choices[0].message.content != null){
                console.log("MADE IT TO THE TITLE with scripture: ", jsonScripture.choices[0].message.content);
                let contentToSend = `"Provide just a devotional title based on ${jsonScripture} but don't include any scripture in this response"`;
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{"role": "user", "content": contentToSend}],
                        max_tokens: 300,
                        temperature: 0.7,
                    }),
                
                })
                const jsonTitle = await response.json();  
                setDevotionTitle(jsonTitle.choices[0].message.content);
                console.log("this is the result devotionTitle", jsonTitle.choices[0].message.content);
                if(jsonTitle.choices[0].message.content != null){
                    console.log("MADE IT TO THE DEVO WRITTING with title: ", jsonTitle.choices[0].message.content);
                    let contentToSend = `"Write a brief devotional based on the title ${jsonTitle.choices[0].message.content} and scripture ${jsonScripture.choices[0].message.content}"`;
                    const response = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${API_KEY}`
                        },
                        body: JSON.stringify({
                            model: "gpt-3.5-turbo",
                            messages: [{"role": "user", "content": contentToSend}],
                            max_tokens: 700,
                            temperature: 0.7,
                        }),
                    
                    })
                    const jsonDevotion = await response.json();  
                    setDevotionBody(jsonDevotion.choices[0].message.content);
                    console.log("this is the result devotionTitle", jsonDevotion.choices[0].message.content);
                    
                    setLoading(false);
                    console.log('devotionTitle AFTER LOAD: ', jsonTitle.choices[0].message.content);
                    console.log('devotionScripture AFTER LOAD: ', jsonScripture.choices[0].message.content);
                    console.log('devotionBOdy AFTER LOAD: ', jsonDevotion.choices[0].message.content);
                    console.log('devotion Running UserId: ', devoType.runningUser[0].id);

                    ///POST DAILY DEVO TO DB
                    await fetch(`${BASE_URL_DEV}/data/postdailydevo`, {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: jsonTitle.choices[0].message.content,
                            scripture: jsonScripture.choices[0].message.content,
                            body: jsonDevotion.choices[0].message.content,
                            userid: devoType.runningUser[0].id
                        }),
                      })
                    .then((response) =>{
                        console.log('response', response.json());
                    //   loadData();
                    //   Alert.alert('Prayer Request Submitted!');
                    //   setModalVisible(false);
                    })
                    // const dbResponse = await responseDb.json(); 
                    // console.log('dbResponse', dbResponse);
                }
            }
                
            } catch (error) {
                console.error("this is the result", error);
            }  
        }
    }

    if(loading){
        return(
        
            <View style={[styles.devotionBodyLoadingView]}>
                <Pressable style={styles.bottomButton} onPress={() => testDevoToDB()}>
                    <Text style={styles.bottomButtonText}>Test DEvo To DB</Text>
                </Pressable>
                <ActivityIndicator size="large" color="#C56E33" />
                
                <Text >
                    {'\n'}
                    {'\n'}
                    Writing your personal devotion... 
                    {'\n'}
                    This may take a minute or two...
                </Text>
            </View>
            
        );
    }
    else{
        return(
        
            <ScrollView style={[styles.devotionBodyView]}>
                <Text style={[styles.devotionTitleText]}>
                    {devotionTitle}
                    {'\n'}
                </Text>
                <Text style={[styles.devotionScriptureText]}>
                    {devotionScripture}
                    {'\n'}
                </Text>
                
                <Text style={[styles.devotionBodyText]}>
                    {devotionBody}
                </Text>
                <Text></Text>
                {/* <Text> */}
                    {/* <RenderHtml
                        tagsStyles={tagsStyles}
                        contentWidth={width}
                        source={{html: devotionBody}}
                    /> */}
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
    bottomButton:{
        backgroundColor: '#C56E33',
        height:60,
        width:150,
    },
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
    },
    devotionBodyText:{
        fontSize:20,
        // textAlign: 'center',
        marginLeft: 15,
        marginRight: 5
        // color: '#C56E33',
        // fontStyle: 'italic',
        // marginLeft: 15,
        // marginRight: 15
    }

    
})

export default personalDevotionPage;

// switch(devoTypeselected.selected){
        //     case 'Depression':
        //         setDevotionBody(depression);
        //         setLoading(false);
        //         break;
        //     case 'Fear':
        //         setDevotionBody(fear);
        //         setLoading(false);
        //         break;
        //     case 'Strength':
        //         setDevotionBody(strength);
        //         setLoading(false);
        //         break;
        //     case 'Job Loss':
        //         setDevotionBody(jobLoss);
        //         setLoading(false);
        //         break;
        //     case 'Loss':
        //         setDevotionBody(loss);
        //         setLoading(false);
        //         break;
        //     case 'Sickness':
        //         setDevotionBody(sickness);
        //         setLoading(false);
        //         break;
        //     case 'Parenting':
        //         setDevotionBody(parenting);
        //         setLoading(false);
        //         break;
        //     case 'Spiritual Growth':
        //         setDevotionBody(spiritualGrowth);
        //         setLoading(false);
        //         break;


         
        // setDevotionBody(devObject2);
        
        // Get AI DEVO HERE
        // fetch('http://10.0.0.13:3210/data')
        //   .then((resp) => resp.json())
        //   .then((json) => setData(json))
        //   .catch((error) => console.error(error))
        //   .finally(() => setLoading(false));
    //     console.log('devotionBody',devotionBody);
    //     console.log('devoTypeselected : ', devoTypeselected)
    //   }, []);