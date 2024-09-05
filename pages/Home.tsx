import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import {supabase} from "../lib/supabase";
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../components/Header";
import ScrollSection from "../components/ScrollSection";

export default function Home() {
    const [appointments, setAppointments] = useState([]);
    const [servicesByAppointment, setServicesByAppointment] = useState([]);

    useEffect(() => {
        fetchAppointments()
            .then()
            .catch(e => console.log(e));
        fetchServicesByAppointment()
            .then()
            .catch(e => console.log(e.message));
    }, []);

    async function fetchAppointments() {
        let {data, error} = await supabase
            .from('appointment')
            .select(`
                *,
                user_appointment!inner (
                    user:user_id (
                        user_id,
                        name,
                        birth_date,
                        profile_photo_path,
                        phone,
                        email
                    )
                )
            `)

        if (error) {
            console.error('Error:', error);
        } else {
            setAppointments(data);
        }
    }

    async function fetchServicesByAppointment() {
        let {data, error} = await supabase
            .from('appointment_service')
            .select(`
            appointment_id,
            service:service_id (
                service_id,
                name,
                description,
                price,
                estimated_time,
                image_path
            )
        `)
            .order('appointment_id');

        if (error) {
            console.error('Error:', error);
        } else {
            const servicesByAppointment = data.reduce((acc, item) => {
                if (!acc[item.appointment_id]) {
                    acc[item.appointment_id] = [];
                }
                acc[item.appointment_id].push(item.service);
                return acc;
            }, {});
            setServicesByAppointment(servicesByAppointment);
        }
    }

    function formatDate(dateString) {
        if (!dateString) return 'Fecha no disponible';
        return new Date(dateString).toISOString().split('T')[0];
    }

    const renderAppointmentInfo = ({item}) => {
        const appointmentServices = servicesByAppointment[item.appointment_id] || [];

        return (
            <View style={styles.appointmentContainer}>
                <View style={styles.appointmentIconContainer}>
                    <Icon name="calendar" style={styles.icon}/>
                </View>
                <View style={styles.appointmentData}>
                    {appointmentServices.map((service, index) => (
                        <Text key={index} style={styles.appointmentService}>
                            {service.name}
                        </Text>
                    ))}
                    <Text style={styles.appointmentDate}>
                        {formatDate(item.date)}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <ScrollSection title='Promociones' table='promotion' />
            <ScrollSection title='Servicios' table='service' />

            <Text style={styles.titleSection}>Tus citas</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.appointment_id.toString()}
                showsVerticalScrollIndicator={true}
                renderItem={renderAppointmentInfo}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    appointmentContainer: {
        borderStyle: "solid",
        borderColor: '#FDCCC5',
        borderWidth: 2,
        borderRadius: 10,
        height: 75,
        width: 350,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    appointmentIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 18,
        width: 75,
        height: 75,
        borderRadius: 10,
        backgroundColor: '#FDCCC5',
        color: '#18181820',
        marginLeft: -1
    },
    icon: {
        color: '#18181860',
        fontSize: 28
    },
    appointmentData: {
        paddingLeft: 10
    },
    appointmentService: {
        fontWeight: "bold",
        color: '#181818'
    },
    appointmentDate: {
        color: '#18181830',
        fontWeight: "bold"
    },
    titleSection: {
        fontWeight: "500",
        fontSize: 24,
        marginBottom: 18
    },
});