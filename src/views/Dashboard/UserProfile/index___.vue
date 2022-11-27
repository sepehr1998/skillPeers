<template>
  <div class="main-view-container">
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 600px; background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-primary opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{ $store.getters.viewName }}</h1>
            <p class="text-white mt-0 mb-5">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow mb-4">
            <img src="@/assets/profile-bg.jpg" alt="Image placeholder" class="card-img-top" />
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a>
                    <i
                      v-if="loadingUserImage"
                      class="fa fa-circle-notch fa-spin fa-3x loading-image loading-image-rotating text-info"
                    ></i>
                    <i
                      @click="saveSelectedImage()"
                      v-if="profileImageChangeMode"
                      class="fa fa-check-circle fa-2x accept-image text-success cursor-pointer"
                    ></i>
                    <i
                      @click="cancelChangingImage()"
                      v-if="profileImageChangeMode"
                      class="fa fa-times-circle fa-2x cancel-image text-danger cursor-pointer"
                    ></i>

                    <img
                      v-if="model.userImage && model.userImage.length > 0"
                      :src="model.userImage"
                      class="rounded-circle z-index-100 cursor-pointer"
                      width="130px"
                      @click="openFilePicker"
                    />
                    <img
                      v-else
                      src="@/assets/no_avatar/0.png"
                      class="rounded-circle z-index-100 cursor-pointer"
                      width="130px"
                      @click="openFilePicker"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row mb-7 mb-md-5 mb-7"></div>
              <div class="text-center">
                <h3>
                  {{ model.firstName }} {{ model.lastName }}
                  <!-- <span
                    class="font-weight-light"
                  >, {{ userAge }}</span>-->
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>
                  {{ cityName }},
                  {{ countryName }}
                </div>
                <div class="h5 mt-4">{{ getCardViewExperiment() }}</div>
                <div v-if="educations && educations.length>0">{{ educations[0].university }}</div>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="h3 mb-0">
                Skills
                <i
                  :disabled="skills.length > 10"
                  @click="addNewSkill"
                  class="fas fa-plus-circle float-right skill-add-btn"
                ></i>
              </h5>
            </div>

            <div class="card-body">
              <ul v-if="skills.length > 0" class="list-group list-group-flush list my--3">
                <li class="list-group-item px-0" v-for="itm in skills" :key="itm.skillId">
                  <div class="row align-items-center">
                    <div class="col">
                      <div class="w-100 text-center">
                        <h5 class="m-0">
                          {{ itm.name }}
                          <small>({{ getItemPercentage(itm) }}%)</small>
                        </h5>
                      </div>
                      <base-progress
                        :type="
                          progressTypes[itm.skillId % progressTypes.length]
                        "
                        class="pt-0"
                        :show-percentage="false"
                        :value="getItemPercentage(itm)"
                      />
                    </div>
                    <i
                      :class="
                        removingSkillIds.indexOf(itm.skillId) >= 0
                          ? 'fas fa-circle-notch fa-spin text-warning'
                          : 'far fa-trash-alt remove-item-btn'
                      "
                      @click="removeSkill(itm.skillId)"
                    ></i>
                  </div>
                </li>
              </ul>
              <div v-else>
                <div class="w-100 text-center">
                  <span>No skill to show</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Hourly Rate -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="h3 mb-0">
                Hourly Rates
                <i
                  @click="addNewHourRate()"
                  class="fas fa-plus-circle float-right skill-add-btn"
                ></i>
              </h5>
            </div>
            <div class="card-body">
              <div v-if="hourRates && hourRates.length>0" class="w-100 p-2">
                <!-- Headers -->

                <div class="row mb-3">
                  <div class="col-4 p-0">
                    <span class="h4">Hours</span>
                  </div>
                  <div class="col-3 p-0">
                    <span class="h4">Salary</span>
                  </div>
                  <div class="col-3"></div>
                  <div class="col-2 p-0 text-right"></div>
                </div>

                <div class="row mb-3" v-for="itm in hourRates" :key="itm.id">
                  <div class="col-4 p-0">{{itm.fromHour}} - {{itm.toHour}}</div>
                  <div class="col-3 p-0">$ {{itm.amount}} / H</div>
                  <div class="col-3"></div>
                  <div class="col-2 p-0 text-right">
                    <i
                      :class="
                        removingHourRatesId.indexOf(itm.id) >= 0
                          ? 'fas fa-circle-notch fa-spin text-warning'
                          : 'far fa-trash-alt remove-item-btn'
                      "
                      @click="removeHourRates(itm.id)"
                    ></i>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="w-100 text-center">
                  <span>No houre rate to show</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Experiment -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="h3 mb-0">
                Experience
                <i
                  @click="addNewExperiment()"
                  class="fas fa-plus-circle float-right skill-add-btn"
                ></i>
              </h5>
            </div>
            <div class="card-body">
              <div v-if="experiments && experiments.length>0" class="w-100 p-2">
                <div class="row mb-3" v-for="itm in experiments" :key="itm.id">
                  <div
                    class="col-3 p-0"
                  >{{getStandardDate(itm.start)}} - {{getStandardDate(itm.end)}}</div>
                  <div class="col-7 p-0">{{itm.workplace}}</div>
                  <div class="col-2 p-0 text-right">
                    <i
                      :class="
                        removingExpereimentId.indexOf(itm.id) >= 0
                          ? 'fas fa-circle-notch fa-spin text-warning'
                          : 'far fa-trash-alt remove-item-btn'
                      "
                      @click="removeExperiments(itm.id)"
                    ></i>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="w-100 text-center">
                  <span>No experience to show</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="h3 mb-0">
                Educations
                <i
                  @click="addNewEducation()"
                  class="fas fa-plus-circle float-right skill-add-btn"
                ></i>
              </h5>
            </div>
            <div class="card-body">
              <div v-if="educations && educations.length>0" class="w-100 p-2">
                <div class="row mb-3" v-for="itm in educations" :key="itm.id">
                  <div
                    class="col-3 p-0"
                  >{{getStandardDate(itm.entering)}} - {{getStandardDate(itm.departure)}}</div>
                  <div class="col-7 p-0">{{itm.university}}</div>
                  <div class="col-2 p-0 text-right">
                    <i
                      :class="
                        removingEducationId.indexOf(itm.id) >= 0
                          ? 'fas fa-circle-notch fa-spin text-warning'
                          : 'far fa-trash-alt remove-item-btn'
                      "
                      @click="removeEducations(itm.id)"
                    ></i>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="w-100 text-center">
                  <span>No Education to show</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">My account</h3>
                </div>
                <div class="col-4 text-right">
                  <base-button
                    v-if="!editMode"
                    @click="profileForm2EditMode()"
                    size="sm"
                    type="info"
                  >Edit Mode</base-button>
                  <base-button
                    v-if="editMode"
                    @click="saveChanges()"
                    size="sm"
                    type="success"
                    :disabled="saving"
                  >
                    <i v-if="saving" class="fas fa-circle-notch fa-spin"></i>
                    Save Changes
                  </base-button>
                  <base-button
                    v-if="editMode"
                    @click="cancelEdit()"
                    size="sm"
                    type="danger"
                    :disabled="saving"
                  >Cancel</base-button>
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="First name"
                        placeholder="First name"
                        input-classes="form-control-alternative"
                        v-model="model.firstName"
                        :disabled="formIsDisabled"
                      ></base-input>
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Last name"
                        placeholder="Last name"
                        input-classes="form-control-alternative"
                        v-model="model.lastName"
                        :disabled="formIsDisabled"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group has-label">
                        <label class="form-control-label">BirthDate</label>
                        <flat-pickr
                          class="form-control form-control-alternative custom-flat-pickr"
                          alternative
                          :disabled="formIsDisabled"
                          v-model="model.birthDate"
                          placeholder="Select birthDate"
                        ></flat-pickr>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Language"
                        placeholder="English, Spanish"
                        input-classes="form-control-alternative"
                        v-model="model.language"
                        :disabled="formIsDisabled"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">Address</h6>

                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                        alternative
                        label="Address"
                        placeholder="Home Address"
                        input-classes="form-control-alternative"
                        v-model="model.address"
                        :disabled="formIsDisabled"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="form-group mb-3 has-label">
                        <div>
                          <label class="form-control-label">City</label>
                        </div>
                        <el-select
                          v-model="selectedCity"
                          no-match-text="no match data"
                          filterable
                          placeholder="City"
                          no-data-text="No city available"
                          :default-first-option="false"
                          :disabled="formIsDisabled"
                        >
                          <el-option
                            v-for="item in listOfCities"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :loading="cityLoading"
                            :remote="true"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group mb-3 has-label">
                        <div>
                          <label class="form-control-label">Country</label>
                        </div>

                        <el-select
                          class="select-danger"
                          v-model="selectedCountry"
                          no-match-text="no match data"
                          filterable
                          placeholder="Country"
                          no-data-text="No country available"
                          :default-first-option="false"
                          :disabled="formIsDisabled"
                        >
                          <el-option
                            class="select-danger"
                            v-for="item in listOfCountries"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Zip code"
                        placeholder="Zip code"
                        input-classes="form-control-alternative"
                        v-model="model.zipCode"
                        :disabled="formIsDisabled"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Contact information -->

                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Email address"
                        placeholder="Pouyan@example.com"
                        input-classes="form-control-alternative"
                        v-model="model.email"
                        disabled
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Tel."
                        placeholder="Phone Number"
                        input-classes="form-control-alternative"
                        v-model="model.tel"
                        :disabled="formIsDisabled"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Linkedin"
                        placeholder="linkedin"
                        input-classes="form-control-alternative"
                        v-model="model.linkedin"
                        :disabled="formIsDisabled"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Website"
                        placeholder="WebSite"
                        input-classes="form-control-alternative"
                        v-model="model.website"
                        :disabled="formIsDisabled"
                      />
                    </div>
                    <div class="col-lg-4"></div>
                  </div>
                </div>
                <hr class="my-4" />

                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">About me</h6>
                <div class="pl-lg-4">
                  <div class="form-group">
                    <base-input alternative label="About Me">
                      <textarea
                        :disabled="formIsDisabled"
                        rows="4"
                        class="form-control form-control-alternative"
                        placeholder="A few lines about me ..."
                        v-model="model.about"
                      ></textarea>
                    </base-input>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>

    <input
      type="file"
      @change="loadImageFile"
      ref="file-picker-helper"
      style="display: none"
      accept="image/png, image/jpeg"
    />

    <add-skill-modal
      @cancel="go2AddNewSkillModal = false"
      @addSkill="addSkill"
      :showModal="go2AddNewSkillModal"
      :outSkills="skills"
    ></add-skill-modal>

    <add-new-hour-rate-modal
      @cancel="go2AddNewHourRateModal = false"
      @addHoureRate="addHoureRate"
      :showModal="go2AddNewHourRateModal"
    ></add-new-hour-rate-modal>

    <add-new-experiment-modal
      @cancel="go2AddNewExperimentModal = false"
      @addExperiment="addExperiment"
      :showModal="go2AddNewExperimentModal"
    ></add-new-experiment-modal>

    <add-new-education-modal
      @cancel="go2AddNewEducationModal = false"
      @addEducation="addEducation"
      :showModal="go2AddNewEducationModal"
    ></add-new-education-modal>
  </div>
</template>
<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import AddSkillModal from "@/components/AddSkillModal";
import { calcAge, getServerAddress } from "@/utils";
import { uploadTempFile } from "@/api/files";
import AddNewHourRateModal from "@/components/AddNewHourRateModal";
import AddNewExperimentModal from "@/components/AddNewExperimentModal";
import AddNewEducationModal from "@/components/AddNewEducationModal";
export default {
  name: "user-profile",
  components: {
    flatPickr,
    AddSkillModal,
    AddNewHourRateModal,
    AddNewExperimentModal,
    AddNewEducationModal,
  },
  data() {
    return {
      go2AddNewSkillModal: false,
      profileImageChangeMode: false,
      go2AddNewHourRateModal: false,
      go2AddNewExperimentModal: false,
      go2AddNewEducationModal: false,
      editMode: false,
      saving: false,
      loadingUserImage: false,
      removingSkillIds: [],
      removingHourRatesId: [],
      removingExpereimentId: [],
      removingEducationId: [],
      listOfCountries: [],
      cityLoading: false,
      listOfCities: [],
      selectedCountry: "",
      selectedCity: "",
      cityPromiseList: [],
      hourRates: [],
      experiments: [],
      educations: [],
      model: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        about: "",
        birthDate: "",
        userImage: "",
        language: "",
        tel: "",
        website: "",
        linkedin: "",
      },
      skills: [],
      progressTypes: ["warning", "success", "danger", "info"],
    };
  },
  methods: {
    profileForm2EditMode() {
      this.editMode = true;
    },
    saveChanges() {
      // this.editMode = false;
      this.saving = true;

      let userInfo = {};

      userInfo.firstName = this.model.firstName;
      userInfo.lastName = this.model.lastName;
      userInfo.birthDate = this.model.birthDate
        ? this.model.birthDate + "T00:00:00.000"
        : null;

      userInfo.address = this.model.address;
      userInfo.zipCode = this.model.zipCode;
      userInfo.bio = this.model.about;
      userInfo.language = this.model.language;
      userInfo.mobile = this.model.tel;
      userInfo.webSite = this.model.webSite;
      userInfo.linkedin = this.model.linkedin;

      if (this.selectedCountry > 0) {
        userInfo.countryId = this.selectedCountry;
        userInfo.country = this.getCountryByID(this.selectedCountry);
      } else {
        userInfo.countryId = null;
        userInfo.country = null;
      }

      if (this.selectedCity > 0) {
        userInfo.cityId = this.selectedCity;
        userInfo.city = this.getCityByID(this.selectedCity);
      } else {
        userInfo.cityId = null;
        userInfo.city = null;
      }

      // userInfo.hourRates = this.hourRates;

      this.$store
        .dispatch("user/updateUserProfile", userInfo)
        .then(() => {
          console.warn("successfully saved");
          this.revertChanges();
          this.saving = false;
          this.editMode = false;
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
          this.revertChanges();
          this.saving = false;
          this.editMode = false;
        });
    },
    revertChanges() {
      this.model.email = this.$store.getters.userEmail;
      this.model.userImage = this.$store.getters.userImage;
      this.model.firstName = this.$store.getters.userFirstName || "";
      this.model.lastName = this.$store.getters.userLastName || "";
      this.model.birthDate = this.$store.getters.userBirthDate || null;

      this.model.address = this.$store.getters.userAddress || "";
      this.model.zipCode = this.$store.getters.userZipCode || "";
      this.model.about = this.$store.getters.userBio || "";
      this.model.language = this.$store.getters.userLanguage || "";
      this.model.tel = this.$store.getters.userPhone || "";
      this.model.website = this.$store.getters.userWebSite || "";
      this.model.linkedin = this.$store.getters.userLinkedin || "";

      this.selectedCountry = this.$store.getters.userCountryId || undefined;
      this.selectedCity = this.$store.getters.userCityId || undefined;

      this.experiments = this.$store.getters.userExperiments;

      this.educations = this.$store.getters.userEducations;

      this.hourRates = this.$store.getters.userHourRate;

      this.skills = this.$store.getters.userSkills;

      if (this.birthDate && this.birthDate.length > 0) {
        this.birthDate = this.birthDate.substring(0, 10);
      }
    },
    initData() {
      this.getAllCountries();
      this.revertChanges();
    },
    cancelEdit() {
      this.editMode = false;
      this.revertChanges();
    },
    addNewSkill() {
      this.go2AddNewSkillModal = true;
    },
    addNewHourRate() {
      this.go2AddNewHourRateModal = true;
    },
    addNewExperiment() {
      this.go2AddNewExperimentModal = true;
    },
    addNewEducation() {
      this.go2AddNewEducationModal = true;
    },
    addSkill(skill) {
      console.log("ADDING");
      this.go2AddNewSkillModal = false;
      this.skills = this.$store.getters.userSkills;
      console.log(skill);
    },
    addHoureRate(hourRate) {
      this.go2AddNewHourRateModal = false;
      this.hourRates = this.$store.getters.userHourRate;
      console.log("Adding new HourRate: ", hourRate);
      console.log("After update hour rate: ", this.hourRates);
    },
    addExperiment(exp) {
      this.go2AddNewExperimentModal = false;
      this.experiments = this.$store.getters.userExperiments;
      console.log("Adding new HourRate: ", exp);
      console.log("After update hour rate: ", this.experiments);
    },
    addEducation(edu) {
      this.go2AddNewEducationModal = false;
      this.educations = this.$store.getters.userEducations;
      console.log("Adding new HourRate: ", edu);
      console.log("After update hour rate: ", this.educations);
    },
    getCardViewExperiment() {
      if (this.experiments && this.experiments.length > 0) {
        let expDays = this.experiments.reduce((accumulator, currentItm) => {
          const start = new Date(currentItm.start);
          const end = new Date(currentItm.end);

          const diffTime = Math.abs(end - start);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return accumulator + diffDays;
        }, 0);
        let expYears = Math.ceil(expDays / 365);
        expYears =
          expYears > 1
            ? `${expYears} years of experiences.`
            : "1 year of experience";
        return expYears;
      }
      return "";
    },
    removeSkill(id) {
      this.removingSkillIds.push(id);
      this.$store
        .dispatch("user/removeSkill", id)
        .then(() => {
          console.log("successfully removed");
          this.skills = this.$store.getters.userSkills;
          let index = this.removingSkillIds.indexOf(id);
          this.removingSkillIds.splice(index, 1);
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
        });
    },
    removeHourRates(id) {
      this.removingHourRatesId.push(id);
      this.$store
        .dispatch("user/removeHourRates", id)
        .then(() => {
          console.log("successfully removed");
          this.hourRates = this.$store.getters.userHourRate;
          let index = this.removingHourRatesId.indexOf(id);
          this.removingHourRatesId.splice(index, 1);
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
        });
    },

    removeExperiments(id) {
      this.removingExpereimentId.push(id);
      this.$store
        .dispatch("user/removeExperiment", id)
        .then(() => {
          console.log("successfully removed");
          this.experiments = this.$store.getters.userExperiments;
          let index = this.removingExpereimentId.indexOf(id);
          this.removingExpereimentId.splice(index, 1);
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
        });
    },

    removeEducations(id) {
      this.removingEducationId.push(id);
      this.$store
        .dispatch("user/removeEducation", id)
        .then(() => {
          console.log("successfully removed");
          this.educations = this.$store.getters.userEducations;
          let index = this.removingEducationId.indexOf(id);
          this.removingEducationId.splice(index, 1);
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
        });
    },
    openFilePicker() {
      if (this.profileImageChangeMode || this.loadingUserImage) return;
      this.$refs["file-picker-helper"].click();
    },
    loadImageFile(event) {
      console.log("changing image", event);
      this.loadingUserImage = true;
      if (event.target.files.length) {
        let formData = new FormData();
        formData.append("files", event.target.files[0]);
        console.log("Setting image from file", event.target.files[0]);
        uploadTempFile(formData)
          .then((res) => {
            console.log("Successfully upload temp file", res);
            this.model.userImage = getServerAddress() + "/files/" + res.data[0];
            this.profileImageChangeMode = true;
            this.loadingUserImage = false;
          })
          .catch((err) => {
            console.log("Failed to save temp image file", err);
            this.loadingUserImage = true;
          });
      }
    },
    saveSelectedImage() {
      let uploadImage = this.model.userImage.replace(
        getServerAddress() + "/files/",
        ""
      );

      this.$store
        .dispatch("user/updateUserProfile", {
          image: uploadImage,
        })
        .then(() => {
          console.warn("successfully saved");
          this.model.userImage = this.$store.getters.userImage;

          this.profileImageChangeMode = false;
          this.loadingUserImage = false;
        })
        .catch((err) => {
          console.warn("Failed saving edited profile", err);
          this.model.userImage =
            getServerAddress() + "/files/" + this.$store.getters.userImage;
          this.profileImageChangeMode = false;
          this.loadingUserImage = false;
        });
    },
    cancelChangingImage() {
      this.model.userImage = this.$store.getters.userImage;
      this.profileImageChangeMode = false;
    },
    getItemPercentage(itm) {
      let val = parseInt(itm.percent);
      return val > 0 && val <= 100 ? val : 100;
    },
    getAllCountries() {
      this.$store
        .dispatch("location/getCountries")
        .then((res) => {
          console.log("Country list: ", res);
          this.listOfCountries = res;
        })
        .catch((err) => {
          console.warn("Faild to fetch counries", err);
        });
    },
    getCountryByID(id) {
      for (let itm of this.listOfCountries) {
        if (itm.id == id)
          return {
            name: itm.name,
            sortOrder: itm.sortOrder,
          };
      }
      return null;
    },
    getCityByID(id) {
      for (let itm of this.listOfCities) {
        if (itm.id == id)
          return {
            name: itm.name,
            sortOrder: itm.sortOrder,
          };
      }
      return null;
    },
    async loadRelatedCities() {
      this.cityLoading = true;
      this.listOfCities = [];
      if (this.selectedCountry < 0) {
        this.listOfCities = [];
        return;
      }

      let cityPromise = new Promise((resolve, reject) => {
        this.$store
          .dispatch("location/getLanguages", {
            countryId: this.selectedCountry,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });

      try {
        this.listOfCities = await cityPromise;
      } catch (err) {
        console.warn(
          "Failed loading related cities to " +
            this.selectedCountry +
            " country",
          err
        );
      }
    },
    getStandardDate(stringDate) {
      if (stringDate && stringDate.length > 0)
        return new Date(stringDate).getFullYear().toString();
      return "-";
    },
  },
  computed: {
    formIsDisabled() {
      return this.saving || !this.editMode;
    },
    userAge() {
      if (this.model.birthDate && this.model.birthDate.length) {
        let age = calcAge(this.model.birthDate);
        console.log("Age: ", age);
        return age;
      }
      return "";
    },
    userExperiment() {
      return this.model.expertise;
    },
    cityName() {
      let city = this.getCityByID(this.selectedCity);
      return city ? city.name : "";
    },
    countryName() {
      let country = this.getCountryByID(this.selectedCountry);
      return country ? country.name : "";
    },
  },
  watch: {
    selectedCountry: function (newVal) {
      console.log("Country new Value: ", newVal);
      this.loadRelatedCities();
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style lang="scss" scoped>
.main-view-container {
  min-height: calc(100vh - 55px);
  margin-bottom: 80px;
}
.custom-flat-pickr[readonly]:not(:disabled) {
  background-color: #fff !important;
}
.skill-add-btn {
  margin-top: 5px;
  &[disabled] {
    transform: scale(0.9);
    pointer-events: none;
    color: #909fb0;
  }
  &:not([disabled]) {
    color: #2dce89;
    cursor: pointer !important;
    &:hover {
      transform: scale(1.2);
    }
  }
}
.remove-item-btn {
  color: #f5365c;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
}

.accept-image {
  position: absolute;
  left: 50%;
  transform: translate(25px, 40px);
  -webkit-transform: translate(25px, 40px);
  z-index: 150;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    transform: translate(25px, 40px) scale(1.1);
    -webkit-transform: translate(25px, 40px) scale(1.1);
  }
}
.cancel-image {
  position: absolute;
  left: 50%;
  transform: translate(-55px, 40px);
  -webkit-transform: translate(-55px, 40px);
  z-index: 150;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    transform: translate(-55px, 40px) scale(1.1);
    -webkit-transform: translate(-55px, 40px) scale(1.1);
  }
}
.z-index-100 {
  z-index: 100;
}
.cursor-pointer {
  cursor: pointer;
}

//custom animation
.loading-image {
  position: absolute;
  /*48 is the size of loading*/
  left: calc(50% - 24px);
  -webkit-transform: translate(-25px, -15px);
  -o-transform: translate(-25px, -15px);
  transform: translate(-25px, -15px);
  z-index: 150;
}

::v-deep .el-input.is-disabled {
  .el-input__inner {
    background-color: #e9ecef;
    border: 0;
    box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);

    color: #8898aa;
  }
}
</style>
