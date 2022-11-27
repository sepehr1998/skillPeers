import {calcAge} from "@/utils";
import {getServerAddress} from "@/utils";

const getters = {
    token: (state) => state.user.token,
    user: (state) => state.user.user,
    userSkills: (state) => (state.user ? state.user.skills : []),
    userProfile: (state) => state.user.profile,
    account: (state) => state.user.account,
    userEmailConfirmed: (state, getters) =>
        getters.user ? getters.user.emailConfirmed : false,
    permissions: (state) => state.user.permissions,
    userInfo: (state, getters) =>
        (getters.userEmail && getters.userEmail.length > 0) ||
        (getters.userPhone && getters.userPhone.length > 0),
    userGender: (state, getters) =>
        getters.userProfile ? getters.userProfile.gender : undefined,

    userName: (state, getters) =>
        getters.user ? getters.user.username : undefined,
    viewName: (state, getters) => getters.userFirstName || getters.userName,
    userFirstName: (state, getters) =>
        getters.user ? getters.user.firstName : undefined,
    userLastName: (state, getters) =>
        getters.user ? getters.user.lastName : undefined,
    userEducations: (state) =>
        state.user.educations ? state.user.educations : [],
    userExperiments: (state) =>
        state.user.experiments ? state.user.experiments : [],
    userHourRate: (state) => (state.user.hourRates ? state.user.hourRates : []),
    userLanguages: (state, getters) =>
        getters.user.languages ? getters.user.languages : [],
    userBirthDate: (state, getters) =>
        getters.userProfile ? getters.userProfile.birthDate : undefined,
    userAddress: (state, getters) =>
        getters.userProfile ? getters.userProfile.address : "",
    userCity: (state, getters) =>
        getters.userProfile ? getters.userProfile.city : null,
    userCountry: (state, getters) =>
        getters.userProfile ? getters.userProfile.country : null,
    userCityId: (state, getters) =>
        getters.userProfile ? getters.userProfile.cityId : null,
    userCityName: (state, getters) =>
        getters.userProfile ? getters.userProfile.cityName : null,
    userCountryId: (state, getters) =>
        getters.userProfile ? getters.userProfile.countryId : null,

    userZipCode: (state, getters) =>
        getters.userProfile ? getters.userProfile.zipCode : null,
    userEmail: (state, getters) =>
        getters.user ? getters.user.email : undefined,
    userPhone: (state, getters) =>
        getters.user ? getters.user.mobile : undefined,
    userLinkedin: (state, getters) =>
        getters.userProfile ? getters.userProfile.linkedin : undefined,
    userWebSite: (state, getters) =>
        getters.userProfile ? getters.userProfile.webSite : undefined,
    userBio: (state, getters) =>
        getters.userProfile ? getters.userProfile.bio : undefined,

    userLogedIn: (state, getters) => {
        let res = getters.token && (getters.userEmail || getters.userPhone);
        console.log("User login status: ", res);
        return res;
    },
    userConfirmed: (state, getters) =>
        getters.user ? getters.user.emailConfirmed : false,
    userImage: (state, getters) =>
        getters.userProfile &&
        getters.userProfile.image &&
        getters.userProfile.image.length > 0
            ? getServerAddress() + "/files/" + getters.userProfile.image
            : undefined,
    userWorkSample1: (state, getters) =>
        getters.userProfile &&
        getters.userProfile.workSample1 &&
        getters.userProfile.workSample1.length > 0
            ? getServerAddress() + "/files/" + getters.userProfile.workSample1
            : undefined,
    userWorkSample2: (state, getters) =>
        getters.userProfile &&
        getters.userProfile.workSample2 &&
        getters.userProfile.workSample2.length > 0
            ? getServerAddress() + "/files/" + getters.userProfile.workSample2
            : undefined,
    userBackground: (state, getters) =>
        getters.userProfile &&
        getters.userProfile.background &&
        getters.userProfile.background.length > 0
            ? getServerAddress() + "/files/" + getters.userProfile.background
            : undefined,
    underConstructionModal: (state) => {
        console.log("getters called");
        return state.showConstructionModal;
    },
    disclaimer: (state) => {
        console.log("getters called");
        return state.showConstructionModal;
    },
underConstructionModal2: (state) => {
        return state.showConstructionModal2;
    },
    sendMessageModal: (state) => {
        console.log("getters message called!");
        return state.showModal;
    },
    userAge: (state, getters) => {
        getters.userProfile.birthDate && getters.userProfile.birthDate.length > 0
            ? calcAge(getters.userProfile.birthDate)
            : "";
    },
};
export default getters;
