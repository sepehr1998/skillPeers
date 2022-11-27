<template>
    <div class="main-view-container">
        <base-header
                class="header pb-6 pt-8 pt-lg-6 d-flex align-items-center"
                style="min-height: 200px; background-size: cover; background-position: center top;"
        >
            <!-- Mask -->
            <span class="mask bg-gradient-primary opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-8 col-md-10">
                        <h1 class="display-3 text-white">Hello {{ $store.getters.viewName }}</h1>
                        <p class="text-white mt-0 mb-5">
                            This is your profile page. You can build/edit your profile here.
                        </p>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                    <div class="card card-profile shadow mb-4">


                        <div class="card-profile-cover-image">

                            <a>
                                <i
                                        v-if="loadingUserBackgroundImage"
                                        class="fa fa-circle-notch fa-spin fa-3x loading-image loading-image-rotating text-info"
                                ></i>
                                <i
                                        @click="saveSelectedBackgroundImage()"
                                        v-if="profileBackgroundImageChangeMode"
                                        class="fa fa-check-circle fa-2x accept-image text-success cursor-pointer"
                                ></i>
                                <i
                                        @click="cancelChangingImage()"
                                        v-if="profileBackgroundImageChangeMode"
                                        class="fa fa-times-circle fa-2x cancel-image text-danger cursor-pointer"
                                ></i>


                                <i
                                        v-if="!loadingUserBackgroundImage && !profileBackgroundImageChangeMode"
                                        class="fas fa-camera upload-bg-image text-white cursor-pointer"
                                        @click="openFilePicker(true)"
                                ></i>

                                <img
                                        v-if="model.userBackground && model.userBackground.length > 0"
                                        :src="model.userBackground"
                                        class="card-img-top cursor-pointer"
                                        @click="openFilePicker(true)"
                                />
                                <img v-else
                                     src="@/assets/profile-bg.jpg"
                                     alt="Image placeholder"
                                     class="card-img-top cursor-pointer"
                                     @click="openFilePicker(true)"/>
                            </a>


                        </div>

                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a>
                                        <i
                                                v-if="loadingUserImage"
                                                class="fa fa-circle-notch fa-spin fa-3x loading-image loading-image-rotating text-info"
                                        ></i>
                                        <i
                                                @click="saveSelectedProfileImage()"
                                                v-if="profileImageChangeMode"
                                                class="fa fa-check-circle fa-2x accept-image text-success cursor-pointer"
                                        ></i>
                                        <i
                                                @click="cancelChangingImage()"
                                                v-if="profileImageChangeMode"
                                                class="fa fa-times-circle fa-2x cancel-image text-danger cursor-pointer"
                                        ></i>


                                        <i
                                                v-if="!loadingUserImage && !profileImageChangeMode"
                                                class="fas fa-camera upload-profile-image cursor-pointer"
                                                @click="openFilePicker(false)"
                                        ></i>


                                        <img
                                                v-if="(model.userImage && model.userImage.length > 0)"
                                                :src="model.userImage"
                                                class="profile-image z-index-100 cursor-pointer"
                                                width="120px"
                                                height="120px"
                                                @click="openFilePicker(false)"
                                        />


                                        <div v-else
                                             @click="openFilePicker(false)"
                                             class="profile-image_svg cursor-pointer z-index-100" v-html="identicon"/>
                                        <!--<img-->
                                        <!--v-else-->
                                        <!--src="@/assets/no_avatar/0.png"-->
                                        <!--class="profile-image z-index-100 cursor-pointer"-->
                                        <!--width="120px"-->
                                        <!--height="120px"-->
                                        <!--@click="openFilePicker(false)"-->
                                        <!--/>-->
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
                                    {{ selectedCity }},
                                    {{ countryName }}
                                </div>
                                <div v-if="$store.getters.user.experimentAvg" class="h5 mt-4">{{ getCardViewExperiment()
                                    }}
                                </div>
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
                                        :disabled="skills.length > 4"
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
                                                <h4 class="m-0">
                                                    {{ itm.name }}
                                                    <small>({{ getItemPercentage(itm) }} years)</small>
                                                </h4>
                                            </div>
<!--                                            <base-progress-->
<!--                                                    :maxValue="30"-->
<!--                                                    :type="-->
<!--                          progressTypes[itm.skillId % progressTypes.length]-->
<!--                        "-->
<!--                                                    class="pt-0"-->
<!--                                                    :show-percentage="false"-->
<!--                                                    :value=100-->
<!--                                            />-->
                                        </div>
                                      <i
                                          :class="'far fa-edit edit-item-btn'"
                                          @click="editSkill(itm.skillId)"
                                      ></i>
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
                        Hourly Rate
                        <i
                            :hidden="hourRates.length > 0"
                            @click="addNewHourRate()"
                            class="fas fa-plus-circle float-right skill-add-btn"
                        ></i>
                      </h5>
                    </div>
                    <div class="card-body">
                      <div v-if="hourRates && hourRates.length>0" class="w-100 p-2">

                        <div class="row " v-for="itm in hourRates" :key="itm.id">
                          <div class="col-3 p-0">$ {{itm.amount}} / Hour</div>
                          <div class="col-7"></div>
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
                          <span>No hour rate to show</span>
                        </div>
                      </div>
                    </div>
                  </div>




                  <div class="card">
                    <div class="card-header">
                      <h5 class="h3 mb-0">Work Samples</h5>
                    </div>

                    <div class="card-body">

                      <template>
                        <div class="row justify-content-center">
                          <div class="mr-2 card-work-sample-image">
                              <a>
                                <i
                                    v-if="loadingUserWS2"
                                    class="fa fa-circle-notch fa-spin fa-3x loading-image loading-image-rotating text-info"
                                ></i>
                                <i
                                    @click="saveSelectedWorkSample2Image()"
                                    v-if="profileWS2ChangeMode"
                                    class="fa fa-check-circle fa-2x accept-image text-success cursor-pointer"
                                ></i>
                                <i
                                    @click="cancelChangingImage()"
                                    v-if="profileWS2ChangeMode"
                                    class="fa fa-times-circle fa-2x cancel-image text-danger cursor-pointer"
                                ></i>


                                <i
                                    v-if="!loadingUserWS2 && !profileWS2ChangeMode"
                                    class="fas fa-camera upload-work-sample-image cursor-pointer"
                                    @click="openFilePickerWS1(false)"
                                ></i>
                                <i v-if="model.workSample2 && model.workSample2.length > 0"
                                    class="fas fa-trash-alt delete-work-sample-image cursor-pointer"
                                    @click="deleteWS2()"
                                ></i>

                                <img
                                    v-if="(model.workSample2 && model.workSample2.length > 0)"
                                    :src="model.workSample2"
                                    class="work-sample-image z-index-100 cursor-pointer"
                                    width="160px"
                                    height="90px"
                                    @click="openFilePickerWS1(false)"
                                />


                                <img
                                    v-else
                                    v-bind:src="'https://via.placeholder.com/160x90?text=%2B'"
                                    class="work-sample-image z-index-100 cursor-pointer"
                                    width="160px"
                                    height="90px"
                                    @click="openFilePickerWS1(false)"
                                />
                              </a>
                          </div>


                          <div class="card-work-sample-image">
                            <a>
                              <i
                                  v-if="loadingUserWS1"
                                  class="fa fa-circle-notch fa-spin fa-3x loading-image loading-image-rotating text-info"
                              ></i>
                              <i
                                  @click="saveSelectedWorkSample1Image()"
                                  v-if="profileWS1ChangeMode"
                                  class="fa fa-check-circle fa-2x accept-image text-success cursor-pointer"
                              ></i>
                              <i
                                  @click="cancelChangingImage()"
                                  v-if="profileWS1ChangeMode"
                                  class="fa fa-times-circle fa-2x cancel-image text-danger cursor-pointer"
                              ></i>


                              <i
                                  v-if="!loadingUserWS1 && !profileWS1ChangeMode"
                                  class="fas fa-camera upload-work-sample-image cursor-pointer"
                                  @click="openFilePickerWS1(true)"
                              ></i>
                              <i v-if="model.workSample1 && model.workSample1.length > 0"
                                  class="fas fa-trash-alt delete-work-sample-image cursor-pointer"
                                  @click="deleteWS1()"
                              >
                              </i>

                              <img
                                  v-if="(model.workSample1 && model.workSample1.length > 0)"
                                  v-bind:src=model.workSample1
                                  class="work-sample-image z-index-100 cursor-pointer"
                                  width="160px"
                                  height="90px"
                                  @click="openFilePickerWS1(true)"
                              />
                              <img
                                  v-else
                                  v-bind:src="'https://via.placeholder.com/160x90?text=%2B'"
                                  class="work-sample-image z-index-100 cursor-pointer"
                                  width="160px"
                                  height="90px"
                                  @click="openFilePickerWS1(true)"
                              />
                            </a>
                          </div>

                        </div>
                      </template>
                    </div>
                  </div>
<!--                    &lt;!&ndash; Experiment &ndash;&gt;-->
<!--                    <div class="card mb-4">-->
<!--                        <div class="card-header">-->
<!--                            <h5 class="h3 mb-0">-->
<!--                                Experience-->
<!--                                <i-->
<!--                                        @click="addNewExperiment()"-->
<!--                                        class="fas fa-plus-circle float-right skill-add-btn"-->
<!--                                ></i>-->
<!--                            </h5>-->
<!--                        </div>-->
<!--                        <div class="card-body">-->
<!--                            <div v-if="experiments && experiments.length>0" class="w-100 p-2">-->
<!--                                <div class="row mb-3" v-for="itm in experiments" :key="itm.id">-->
<!--                                    <div-->
<!--                                            class="col-3 p-0"-->
<!--                                    >{{getStandardDate(itm.start)}} - {{getStandardDate(itm.end)}}-->
<!--                                    </div>-->
<!--                                    <div class="col-7 p-0 pl-1">{{itm.workplace}}</div>-->
<!--                                    <div class="col-2 p-0 text-right">-->
<!--                                        <i-->
<!--                                                :class="-->
<!--                        removingExpereimentId.indexOf(itm.id) >= 0-->
<!--                          ? 'fas fa-circle-notch fa-spin text-warning'-->
<!--                          : 'far fa-trash-alt remove-item-btn'-->
<!--                      "-->
<!--                                                @click="removeExperiments(itm.id)"-->
<!--                                        ></i>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div v-else>-->
<!--                                <div class="w-100 text-center">-->
<!--                                    <span>No experience to show</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->

<!--                    &lt;!&ndash; Education &ndash;&gt;-->
<!--                    <div class="card mb-4">-->
<!--                        <div class="card-header">-->
<!--                            <h5 class="h3 mb-0">-->
<!--                                Educations-->
<!--                                <i-->
<!--                                        @click="addNewEducation()"-->
<!--                                        class="fas fa-plus-circle float-right skill-add-btn"-->
<!--                                ></i>-->
<!--                            </h5>-->
<!--                        </div>-->
<!--                        <div class="card-body">-->
<!--                            <div v-if="educations && educations.length>0" class="w-100 p-2">-->
<!--                                <div class="row mb-3" v-for="itm in educations" :key="itm.id">-->
<!--                                    <div-->
<!--                                            class="col-3 p-0"-->
<!--                                    >{{getStandardDate(itm.entering)}} - {{getStandardDate(itm.departure)}}-->
<!--                                    </div>-->
<!--                                    <div class="col-7 p-0 pl-1">{{itm.university}}</div>-->
<!--                                    <div class="col-2 p-0 text-right">-->
<!--                                        <i-->
<!--                                                :class="-->
<!--                        removingEducationId.indexOf(itm.id) >= 0-->
<!--                          ? 'fas fa-circle-notch fa-spin text-warning'-->
<!--                          : 'far fa-trash-alt remove-item-btn'-->
<!--                      "-->
<!--                                                @click="removeEducations(itm.id)"-->
<!--                                        ></i>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div v-else>-->
<!--                                <div class="w-100 text-center">-->
<!--                                    <span>No Education to show</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-4 pr-0">
                                    <h3 class="mb-0">My account</h3>
                                </div>
                                <div class="col-8 text-right">
                                    <el-button
                                            type="success"
                                            :disabled="saving || !formHasEdit"
                                            @click="saveChanges()"
                                    >
                                        <i v-if="saving" class="fas fa-circle-notch fa-spin"></i>
                                        Save Changes
                                    </el-button>

                                    <el-button
                                            type="danger"
                                            :disabled="saving"
                                            @click="cancelEdit()"
                                    >Cancel
                                    </el-button>
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
                                                    required
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
                                                    required
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
  <!--                                      <div class="col-lg-6">
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
                                        </div>-->

                                        <div class="col-lg-6">
<!--                                            <base-input-->
<!--                                                    alternative-->
<!--                                                    label="Language"-->
<!--                                                    placeholder="English, Spanish"-->
<!--                                                    input-classes="form-control-alternative"-->
<!--                                                    v-model="model.language"-->
<!--                                                    :disabled="formIsDisabled"-->
<!--                                            />-->

                                          <label class="typo__label">Languages</label>
                                          <span class="required-star"> *</span>
                                            <multi-select v-model="selectedLanguage"
                                                       tag-placeholder="Add this as new language"
                                                       placeholder="Search or add a language"
                                                       label="name"
                                                          track-by="id"
                                                       :options="listOfLanguages"
                                                       :multiple="true"
                                                       :taggable="true"
                                                       @tag="addTag">
                                          </multi-select>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4"/>
                                <!-- Address -->
                                <h6 class="heading-small text-muted mb-4">Address</h6>

                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group mb-3 has-label">
                                                <div>
                                                    <label class="form-control-label">Country</label>
                                                    <span class="required-star"> *</span>
                                                </div>

                                                <el-select
                                                        class="select-danger"
                                                        v-model="selectedCountry"
                                                        no-match-text="no match data"
                                                        filterable
                                                        placeholder="Country"
                                                        no-data-text="No country available"
                                                        :default-first-option="false"
                                                        :disabled="formIsDisabled">
<!--                                                        @change= "loadRelatedCities()"-->
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
                                            <div class="form-group mb-3 has-label">
                                                <div>
                                                  <base-input
                                                      alternative
                                                      label="City"
                                                      placeholder="City"
                                                      input-classes="form-control-alternative"
                                                      v-model="selectedCity"
                                                      :disabled="formIsDisabled"
                                                      required
                                                  />
                                                </div>
<!--                                              <div>-->
<!--                                                <label class="form-control-label">City</label>-->
<!--                                                <span class="required-star"> *</span>-->
<!--                                              </div>-->
<!--                                              <el-select-->
<!--                                                  class="select-danger"-->
<!--                                                  v-model="selectedCity"-->
<!--                                                  no-match-text="no match data"-->
<!--                                                  filterable-->
<!--                                                  placeholder="City"-->
<!--                                                  no-data-text="No city available"-->
<!--                                                  :default-first-option="false"-->
<!--                                                  :disabled="formIsDisabled"-->
<!--                                              >-->
<!--                                                <el-option-->
<!--                                                    class="select-danger"-->
<!--                                                    v-for="item in listOfCities"-->
<!--                                                    :key="item.id"-->
<!--                                                    :label="item.name"-->
<!--                                                    :value="item.id"-->
<!--                                                ></el-option>-->
<!--                                              </el-select>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4"/>
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
                                                    required
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input
                                                    alternative
                                                    label="Tel (including country code)"
                                                    placeholder="e.g. +1-541-754-3010"
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
                                <hr class="my-4"/>

                                <!-- Description -->
                                <h6 class="heading-small text-muted mb-4">About me</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative>
                      <textarea
                              :disabled="formIsDisabled"
                              rows="4" style="overflow:auto;"
                              class="form-control form-control-alternative"
                              placeholder="Please explain your expertise/education for your skills"
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
        <edit-skill-modal
            @cancel="go2EditNewSkillModal = false"
            @editSkill="updateSkill"
            :showModal="go2EditNewSkillModal"
            :outSkills="skills"
            :selected-skill="editSkillName"
            :percent="editSkillYear"
        ></edit-skill-modal>

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

        <image-cropper-modal
                @cancel="go2ImageCropperModal = false"
                @loadCroppedImage="loadCroppedImageFile"
                :img="imageForCrop"
                :aspectRatio="cropperAspectRatio"
                :showModal="go2ImageCropperModal"
                v-bind:clickToClose="false">
        </image-cropper-modal>
    </div>
</template>
<script>
   // import flatPickr from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    import AddSkillModal from "@/components/AddSkillModal";
    import EditSkillModal from "@/components/EditSkillModal";
    import {calcAge, getServerAddress} from "@/utils";
    import {uploadTempFile} from "@/api/files";
    import AddNewHourRateModal from "@/components/AddNewHourRateModal";
    import AddNewExperimentModal from "@/components/AddNewExperimentModal";
    import AddNewEducationModal from "@/components/AddNewEducationModal";
    import ImageCropperModal from "@/components/ImageCropperModal";
    import jd from 'jdenticon';
    import MultiSelect from "vue-multiselect";
    import 'ant-design-vue/dist/antd.css';
    import 'vue-multiselect/dist/vue-multiselect.min.css'

    export default {
        name: "user-profile",
        components: {
           // flatPickr,
            AddSkillModal,
            EditSkillModal,
            AddNewHourRateModal,
            AddNewExperimentModal,
            AddNewEducationModal,
            ImageCropperModal,
            MultiSelect,
        },
        data() {
            return {
              //For MultiSelect
              selected: null,
              //End of MultiSelect
              bgColor: '#778899',
              position: 'top-right',
              fabActions: [
                {
                  name: 'cache',
                  icon: 'cached'
                },
                {
                  name: 'alertMe',
                  icon: 'add_alert'
                }
              ],



                go2AddNewSkillModal: false,
                go2EditNewSkillModal: false,
                editSkillId: 0,
                editSkillName: "skill name",
                editSkillYear: 0,
                profileImageChangeMode: false,
                profileWS1ChangeMode: false,
                profileWS2ChangeMode: false,
                profileBackgroundImageChangeMode: false,
                go2AddNewHourRateModal: false,
                go2AddNewExperimentModal: false,
                go2AddNewEducationModal: false,
                go2ImageCropperModal: false,
                imageForCrop: null,
                saving: false,
                loadingUserImage: false,
                loadingUserWS1: false,
                loadingUserWS2: false,
                loadingUserBackgroundImage: false,
                selectImageForUpdate: 0,
                removingSkillIds: [],
                removingHourRatesId: [],
                removingExpereimentId: [],
                removingEducationId: [],
                listOfCountries: [],
                listOfLanguages: [],
                cityLoading: false,
                listOfCities: [],
                selectedCountry: "",
                selectedLanguage: [],
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
                    // birthDate: "",
                    userImage: "",
                    userBackground: "",
                    languages: [],
                    tel: "",
                    website: "",
                    linkedin: "",
                    workSample1: "",
                    workSample2: "",
                },
                skills: [],
                progressTypes: ["warning", "success", "danger", "info"],
                cityLable: "City",
                cropperAspectRatio: {
                    type: Object,
                    default: function () {
                        return {
                            aspectRatio: 12 / 12
                        }
                    },
                }
            };
        },
        methods: {
          deleteWS1(){
            this.$store
                .dispatch("user/updateUserProfile", {
                  workSample1: " ",
                })
                .then(() => {
                  console.warn("successfully saved");
                  this.model.workSample1 = this.$store.getters.userWorkSample1;

                  this.profileWS1ChangeMode = false;
                  this.loadingUserWS1 = false;
                  this.$message({
                    message: "successfully saved",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.warn("Failed saving edited profile", err);

                  this.profileWS1ChangeMode = false;
                  this.loadingUserWS1 = false;
                  this.$message({
                    message: err.errorMessage,
                    type: "error",
                  });
                });
          },

          deleteWS2(){
            this.$store
                .dispatch("user/updateUserProfile", {
                  workSample2: " ",
                })
                .then(() => {
                  console.warn("successfully saved");
                  this.model.workSample2 = this.$store.getters.userWorkSample2;

                  this.profileWS2ChangeMode = false;
                  this.loadingUserWS2 = false;
                  this.$message({
                    message: "successfully saved",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.warn("Failed saving edited profile", err);

                  this.profileWS2ChangeMode = false;
                  this.loadingUserWS2 = false;
                  this.$message({
                    message: err.errorMessage,
                    type: "error",
                  });
                });
          },



          //MultiSelect
          addTag (newTag) {
            const tag = {
              name: newTag,
              code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
          },
          updateSelected (newSelected) {
            this.selected = newSelected;
          },
          //End of MultiSelect
            saveChanges() {

                if (!this.model.firstName || !this.model.firstName.trim().length) {
                    this.$message({
                        message: "first name is required",
                        type: "error",
                    });
                    return;
                }

                if (!this.model.lastName || !this.model.lastName.trim().length) {
                    this.$message({
                        message: "last name is required",
                        type: "error",
                    });
                    return;
                }


                if (this.selectedCountry === undefined || this.selectedCountry === "" || this.selectedCountry < 0) {
                    this.$message({
                        message: "country is required",
                        type: "error",
                    });
                    return;
                }

                if (this.selectedCity === undefined || this.selectedCity === "" || !this.selectedCity < 0) {
                    this.$message({
                        message: this.cityLable + " is required",
                        type: "error",
                    });
                    return;
                }


                this.saving = true;

                let userInfo = {};

                userInfo.firstName = this.model.firstName;
                userInfo.lastName = this.model.lastName;

                userInfo.address = this.model.address;
                userInfo.zipCode = this.model.zipCode;
                userInfo.bio = this.model.about;
                userInfo.languageIds = this.selectedLanguage;
                userInfo.mobile = this.model.tel;
                userInfo.webSite = this.model.website;
                userInfo.linkedin = this.model.linkedin;
                userInfo.cityName = this.selectedCity;

                if (this.selectedCountry > 0) {
                    userInfo.countryId = this.selectedCountry;
                    userInfo.country = this.getCountryByID(this.selectedCountry);
                } else {
                    userInfo.countryId = null;
                    userInfo.country = null;
                }

                // if (this.selectedCity > 0) {
                //     userInfo.cityId = this.selectedCity;
                //     userInfo.city = this.getCityByID(this.selectedCity);
                // } else {
                //     userInfo.cityId = null;
                //     userInfo.city = null;
                // }

                // userInfo.hourRates = this.hourRates;

                this.$store
                    .dispatch("user/updateUserProfile", userInfo)
                    .then(() => {
                        console.warn("successfully saved");
                        this.$message({
                            message: "successfully saved",
                            type: "success",
                        });
                        this.revertChanges();
                        this.saving = false;
                    })
                    .catch((err) => {
                        console.warn("Failed saving edited profile", err);
                        this.$message({
                            message: err.errorMessage,
                            type: "error",
                        });
                        this.revertChanges();
                        this.saving = false;
                    });
            },
            revertChanges() {
                this.model.email = this.$store.getters.userEmail;
                this.model.userImage = this.$store.getters.userImage;
                this.model.userBackground = this.$store.getters.userBackground;
                this.model.firstName = this.$store.getters.userFirstName || "";
                this.model.lastName = this.$store.getters.userLastName || "";
                this.model.birthDate = this.$store.getters.userBirthDate || null;

                this.model.address = this.$store.getters.userAddress || "";
                this.model.zipCode = this.$store.getters.userZipCode || "";
                this.model.about = this.$store.getters.userBio || "";
                this.model.languages = this.$store.getters.userLanguages || [];
                this.model.tel = this.$store.getters.userPhone || "";
                this.model.website = this.$store.getters.userWebSite || "";
                this.model.linkedin = this.$store.getters.userLinkedin || "";
                this.model.workSample1 = this.$store.getters.userWorkSample1 || undefined;
                this.model.workSample2 = this.$store.getters.userWorkSample2 || undefined;

                this.selectedLanguage = this.$store.getters.userLanguages || [];
                this.selectedCountry = this.$store.getters.userCountryId || undefined;
                this.selectedCity = this.$store.getters.userCityName || undefined;

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
                this.getAllLanguages();
                this.revertChanges();
            },
            cancelEdit() {
                this.revertChanges();
                return this.$router.go(-1);
            },
            addNewSkill() {
                if (this.skills.length < 5) {
                    this.go2AddNewSkillModal = true;
                }
            },
            addNewHourRate() {
                if (this.hourRates.length < 1) {
                    this.go2AddNewHourRateModal = true;
                }
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
            updateSkill(skill) {
                console.log("Updating");
                this.go2EditNewSkillModal = false;
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
                if (this.$store.getters.user.experimentAvg) {
                    return this.$store.getters.user.experimentAvg + " years of experiences.";
                }
                // if (this.experiments && this.experiments.length > 0) {
                //     let expDays = this.experiments.reduce((accumulator, currentItm) => {
                //         const start = new Date(currentItm.start);
                //         const end = new Date(currentItm.end);
                //
                //         const diffTime = Math.abs(end - start);
                //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                //         return accumulator + diffDays;
                //     }, 0);
                //     let expYears = Math.ceil(expDays / 365);
                //     expYears =
                //         expYears > 1
                //             ? `${expYears} years of experiences.`
                //             : "1 year of experience";
                //     return expYears;
                // }
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
                        this.$message({
                            message: "successfully removed",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        console.warn("Failed saving edited profile", err);
                        this.$message({
                            message: err.errorMessage,
                            type: "error",
                        });
                    });
            },
            editSkill(id) {
              this.editSkillId = id;
              let skill = this.skills.find(skill => skill.skillId ===id);
              this.editSkillName = skill.name;
              this.editSkillYear = skill.percent;
              this.go2EditNewSkillModal = true;
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
                        this.$message({
                            message: "successfully removed",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        console.warn("Failed saving edited profile", err);
                        this.$message({
                            message: err.errorMessage,
                            type: "error",
                        });
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
                        this.$message({
                            message: "successfully removed",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        console.warn("Failed saving edited profile", err);
                        this.$message({
                            message: err.errorMessage,
                            type: "error",
                        });
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
                        this.$message({
                            message: "successfully removed",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        console.warn("Failed saving edited profile", err);
                        this.$message({
                            message: err.errorMessage,
                            type: "error",
                        });
                    });
            },
            openFilePicker(isBackgound = false) {
                this.selectImageForUpdate = isBackgound? 0 : 1;
                console.log("for background", isBackgound);
                if (this.profileImageChangeMode || this.loadingUserImage) {
                    return;
                }
                this.$refs["file-picker-helper"].click();
            },
          openFilePickerWS1(isWS1 = false) {
            this.selectImageForUpdate = isWS1 ? 2 : 3;
            if (this.profileWS1ChangeMode || this.loadingUserWS1) {
              return;
            }
            this.$refs["file-picker-helper"].click();
          },
            loadImageFile(event) {
                console.log("changing image", event);

                if (event.target.files.length) {

                    if (this.selectImageForUpdate === 0) {
                        this.cropperAspectRatio = {};
                        this.cropperAspectRatio.aspectRatio= 8/3;


                        this.imageForCrop = URL.createObjectURL(event.target.files[0]);
                        this.go2ImageCropperModal = true;

                        //this.loadCroppedImageFile(event.target.files[0]);
                    } else if (this.selectImageForUpdate === 1) {
                        this.cropperAspectRatio = {};
                        this.cropperAspectRatio.aspectRatio= 4/4;
                        this.imageForCrop = URL.createObjectURL(event.target.files[0]);
                        this.go2ImageCropperModal = true;
                    }
                    if (this.selectImageForUpdate === 2) {
                        // this.cropperAspectRatio = {};
                        this.cropperAspectRatio.aspectRatio= 16/9;
                        this.imageForCrop = URL.createObjectURL(event.target.files[0]);
                        this.go2ImageCropperModal = true;
                    } else if (this.selectImageForUpdate === 3) {
                        // this.cropperAspectRatio = {};
                        this.cropperAspectRatio.aspectRatio= 16/9;
                        this.imageForCrop = URL.createObjectURL(event.target.files[0]);
                        this.go2ImageCropperModal = true;
                    }


                }

            },
            loadCroppedImageFile(image) {
                console.log("load cropped image");
                this.go2ImageCropperModal = false;
                if (this.selectImageForUpdate === 1) {
                    this.loadingUserImage = true;

                    let formData = new FormData();
                    formData.append("files", image);
                    uploadTempFile(formData)
                        .then((res) => {
                            console.log("Successfully upload temp file", res);
                            this.model.userImage = getServerAddress() + "/files/" + res.data[0];
                            this.profileImageChangeMode = true;
                            this.loadingUserImage = false;
                        })
                        .catch((err) => {
                            console.log("Failed to save temp image file", err);
                            this.loadingUserImage = false;
                            this.$message({
                                message: err.errorMessage,
                                type: "error",
                            });
                        });

                } else if (this.selectImageForUpdate === 0){
                    this.loadingUserBackgroundImage = true;
                    let formData = new FormData();
                    formData.append("files", image);
                    uploadTempFile(formData)
                        .then((res) => {
                            console.log("Successfully upload temp file", res);
                            this.model.userBackground = getServerAddress() + "/files/" + res.data[0];
                            this.profileBackgroundImageChangeMode = true;
                            this.loadingUserBackgroundImage = false;
                        })
                        .catch((err) => {
                            console.log("Failed to save temp image file", err);
                            this.loadingUserBackgroundImage = false;
                            this.$message({
                                message: err.errorMessage,
                                type: "error",
                            });
                        });

                } else if (this.selectImageForUpdate === 2){
                  this.loadingUserWS1 = true;
                  let formData = new FormData();
                  formData.append("files", image);
                  uploadTempFile(formData)
                      .then((res) => {
                        console.log("Successfully upload temp file", res);
                        this.model.workSample1 = getServerAddress() + "/files/" + res.data[0];
                        this.profileWS1ChangeMode = true;
                        this.loadingUserWS1 = false;
                      })
                      .catch((err) => {
                        console.log("Failed to save temp image file", err);
                        this.loadingUserWS1 = false;
                        this.$message({
                          message: err.errorMessage,
                          type: "error",
                        });
                      });

                } else if (this.selectImageForUpdate === 3){
                  this.loadingUserWS2 = true;
                  let formData = new FormData();
                  formData.append("files", image);
                  uploadTempFile(formData)
                      .then((res) => {
                        console.log("Successfully upload temp file", res);
                        this.model.workSample2 = getServerAddress() + "/files/" + res.data[0];
                        this.profileWS2ChangeMode = true;
                        this.loadingUserWS2 = false;
                      })
                      .catch((err) => {
                        console.log("Failed to save temp image file", err);
                        this.loadingUserWS2 = false;
                        this.$message({
                          message: err.errorMessage,
                          type: "error",
                        });
                      });

                }
            },
            saveSelectedWorkSample1Image() {
              let uploadImage = this.model.workSample1.replace(
                  getServerAddress() + "/files/",
                  ""
              );

              this.$store
                  .dispatch("user/updateUserProfile", {
                    workSample1: uploadImage,
                  })
                  .then(() => {
                    console.warn("successfully saved");
                    this.model.workSample1 = this.$store.getters.userWorkSample1;

                    this.profileWS1ChangeMode = false;
                    this.loadingUserWS1 = false;
                    this.$message({
                      message: "successfully saved",
                      type: "success",
                    });
                  })
                  .catch((err) => {
                    console.warn("Failed saving edited profile", err);
                    this.model.workSample1 =
                        getServerAddress() + "/files/" + this.$store.getters.userWorkSample1;
                    this.profileWS1ChangeMode = false;
                    this.loadingUserWS1 = false;
                    this.$message({
                      message: err.errorMessage,
                      type: "error",
                    });
                  });
            },


          saveSelectedWorkSample2Image() {
            let uploadImage = this.model.workSample2.replace(
                getServerAddress() + "/files/",
                ""
            );

            this.$store
                .dispatch("user/updateUserProfile", {
                  workSample2: uploadImage,
                })
                .then(() => {
                  console.warn("successfully saved");
                  this.model.workSample2 = this.$store.getters.userWorkSample2;

                  this.profileWS2ChangeMode = false;
                  this.loadingUserWS2 = false;
                  this.$message({
                    message: "successfully saved",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.warn("Failed saving edited profile", err);
                  this.model.workSample2 =
                      getServerAddress() + "/files/" + this.$store.getters.userWorkSample2;
                  this.profileWS2ChangeMode = false;
                  this.loadingUserWS2 = false;
                  this.$message({
                    message: err.errorMessage,
                    type: "error",
                  });
                });
          },




          saveSelectedProfileImage() {
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
                  this.$message({
                    message: "successfully saved",
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.warn("Failed saving edited profile", err);
                  this.model.userImage =
                      getServerAddress() + "/files/" + this.$store.getters.userImage;
                  this.profileImageChangeMode = false;
                  this.loadingUserImage = false;
                  this.$message({
                    message: err.errorMessage,
                    type: "error",
                  });
                });
          },




            saveSelectedBackgroundImage() {
                let uploadImage = this.model.userBackground.replace(
                    getServerAddress() + "/files/",
                    ""
                );


                this.$store
                    .dispatch("user/updateUserProfile", {
                        background: uploadImage,
                    })
                    .then(() => {
                        console.warn("successfully saved");
                        this.model.userBackground = this.$store.getters.userBackground;

                        this.profileBackgroundImageChangeMode = false;
                        this.loadingUserBackgroundImage = false;
                        this.$message({
                            message: "successfully saved",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        console.warn("Failed saving edited profile", err);
                        this.model.userBackground =
                            getServerAddress() + "/files/" + this.$store.getters.userBackground;
                        this.profileBackgroundImageChangeMode = false;
                        this.loadingUserBackgroundImage = false;
                        this.$message({
                            message: err.errorMessage,
                            type: "error",
                        });
                    });
            },
            cancelChangingImage() {
                this.model.userImage = this.$store.getters.userImage;
                this.model.workSample1 = this.$store.getters.userWorkSample1;
                this.model.workSample2 = this.$store.getters.userWorkSample2;
                this.model.userBackground = this.$store.getters.userBackground;
                this.profileImageChangeMode = false;
                this.profileBackgroundImageChangeMode = false;
                this.profileWS1ChangeMode = false;
                this.profileWS2ChangeMode = false;
                },
            getItemPercentage(itm) {
                let val = parseInt(itm.percent);
                return val > 0 && val <= 100 ? val : 100;
            },
            getAllCountries() {
                let params = {};
                params.page = 1;
                params.size = 300;

                this.$store
                    .dispatch("location/getCountries", params)
                    .then((res) => {
                        this.listOfCountries = res;
                        if (this.selectedCountry !== null && this.selectedCountry !== undefined) {
                            let country = this.getCountryByID(this.selectedCountry);
                            if (country !== null) {
                                if (country.name === "United States") {
                                    this.cityLable = "City"
                                } else {
                                    this.cityLable = "City"
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        console.warn("Faild to fetch counries", err);
                    });
            },
            getAllLanguages() {
              let params = {};
              params.page = 1;
              params.size = 300;

              this.$store
                  .dispatch("location/getLanguages", params)
                  .then((res) => {
                    this.listOfLanguages = res;
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
/*            async loadRelatedCities() {
                this.cityLoading = true;
                this.listOfCities = [];
                if (this.selectedCountry < 0) {
                    this.listOfCities = [];
                    return;
                }

                let cityPromise = new Promise((resolve, reject) => {
                    let cityParams = {};
                    cityParams.page = 1;
                    cityParams.size = 300;
                    cityParams.countryId = this.selectedCountry;

                    this.$store
                        .dispatch("location/getCities", cityParams)
                        .then((res) => {
                            //change city if country change
                            if (this.selectedCountry != this.$store.getters.userCountryId) {
                                this.selectedCity = undefined;
                            } else {
                                if (this.selectedCity != this.$store.getters.userCityId) {
                                    this.selectedCity = undefined;
                                }
                            }

                            resolve(res)
                        })
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
            },*/
            getStandardDate(stringDate) {
                if (stringDate && stringDate.length > 0)
                    return new Date(stringDate).getFullYear().toString();
                return "-";
            },
            normalStringCheck(str_1, str_2) {
                let str1 = str_1 || "";
                let str2 = str_2 || "";
                str1 = str1.trim();
                str2 = str2.trim();
                return str1 == str2;
            },
        },
        computed: {
            formIsDisabled() {
                return this.saving;
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
                return city ? city : "";
            },
            countryName() {
                let country = this.getCountryByID(this.selectedCountry);
                return country ? country.name : "";
            },
            formHasEdit() {
                if (
                    !this.normalStringCheck(
                        this.model.firstName,
                        this.$store.getters.userFirstName
                    )
                ) {
                    return true;
                }
                if (
                    !this.normalStringCheck(
                        this.model.lastName,
                        this.$store.getters.userLastName
                    )
                ) {
                    console.info("Check FormEditMode", "userLastName");
                    return true;
                }
                if (
                    !this.normalStringCheck(
                        this.model.address,
                        this.$store.getters.userAddress
                    )
                ) {
                    console.info("Check FormEditMode", "userAddress");
                    return true;
                }
                if (
                    !this.normalStringCheck(
                        this.model.zipCode,
                        this.$store.getters.userZipCode
                    )
                ) {
                    console.info("Check FormEditMode", "userZipCode");
                    return true;
                }
                if (
                    !this.normalStringCheck(this.model.about, this.$store.getters.userBio)
                ) {
                    console.info("Check FormEditMode", "userBio");
                    return true;
                }
                // if (
                //     !this.normalStringCheck(
                //         this.model.language,
                //         this.$store.getters.userLanguages
                //     )
                // ) {
                //     console.info("Check FormEditMode", "userLanguage");
                //     return true;
                // }
                if (
                    !this.normalStringCheck(this.model.tel, this.$store.getters.userPhone)
                ) {
                    console.info("Check FormEditMode", "userPhone");
                    return true;
                }
                if (
                    !this.normalStringCheck(
                        this.model.website,
                        this.$store.getters.userWebSite
                    )
                ) {
                    console.info("Check FormEditMode", "userWebSite");
                    return true;
                }
                if (
                    !this.normalStringCheck(
                        this.model.linkedin,
                        this.$store.getters.userLinkedin
                    )
                ) {
                    console.info("Check FormEditMode", "userLinkedin");
                    return true;
                }
                if (this.selectedCountry != this.$store.getters.userCountryId) {
                    console.info("Check FormEditMode", "userCountryId");
                    return true;
                }
                if (this.selectedCity != this.$store.getters.userCityName) {
                  console.info("Check FormEditMode", "userCityId");
                  return true;
                }

              if (this.selectedLanguage != this.$store.getters.userLanguages)
                return true;
              else
                return false;
                // Check birthdate
                // let birthDate = this.model.birthDate || "";
                // let origBirthDate = this.$store.getters.userBirthDate
                //     ? this.$store.getters.userBirthDate.substring(0, 10)
                //     : "";
                // if (birthDate != origBirthDate) return true;
                // return false;
            },
            identicon() {
                let config = {};
                config.backColor = '#f6f6f6';
                let svg = jd.toSvg(this.$store.getters.user.id, 120, config);
                return svg;
            },
            backIdenticon() {
                let config = {};
                config.backColor = '#f6f6f6';
                let svg = jd.toSvg(this.user.email, 300, config);
                return svg;
            },
        },
        watch: {
            selectedCountry: function (newVal) {
                console.log("Country new Value: ", newVal);

                let country = this.getCountryByID(newVal);
                if (country !== null) {
                    if (country.name === "United States") {
                        this.cityLable = "State"
                    } else {
                        this.cityLable = "City"
                    }
                }


                // this.loadRelatedCities();
            },
        },
        mounted() {
            this.initData();
        },
    };
</script>

<style lang="scss" scoped>
    .profile-image {
        border-radius: 50%;
        max-width: 120px;
        max-height: 120px;
    }

    .work-sample-image {
      max-width: 120px;
      max-height: 120px;
    }
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


    .card-work-sample-image {
      position: relative;

      img {
        max-width: 180px;
        border-radius: .25rem;
        position: relative;
        transition:  all .2s ease-in-out;
        &:hover {
          transform: scale(1.03);
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


    .edit-item-btn {
      color: blue;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
      margin-right: 0.5rem;
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

    .upload-bg-image {
        position: absolute;
        /*48 is the size of loading*/
        /*left: calc(50% - 14px);*/
        right: 10px;
        bottom: 10px;
        z-index: 150;
        opacity: 0.5;
        color: #ffffff;
        font-size: 2em;
    }

    .upload-profile-image {
        position: absolute;
        /*48 is the size of loading*/
        left: calc(50% + 20px);
        bottom: 38px;
        z-index: 150;
        opacity: 0.8;
        color: #666666;
        font-size: 1em;
        padding: 4px;
        border-radius: 100%;
        background: white;
        border: 1px solid #000;
    }

    .upload-work-sample-image {
      position: absolute;
      /*48 is the size of loading*/
      left: calc(0%);
      top: calc(0%);
      z-index: 150;
      opacity: 0.8;
      color: #666666;
      font-size: 1em;
      padding: 4px;
      border-radius: 100%;
      background: white;
      border: 1px solid #000;
    }
    .delete-work-sample-image {
      position: absolute;
      /*48 is the size of loading*/
      right: calc(0%);
      top: calc(0%);
      z-index: 150;
      opacity: 0.8;
      color: red;
      font-size: 1em;
      padding: 4px;
      border-radius: 100%;
      background: white;
      border: 1px solid #000;
    }

    .upload-profile-image:hover {
        transform: scale(1.1);
    }
    .upload-work-sample-image:hover {
      transform: scale(1.1);
    }

    ::v-deep .profile-image_svg > svg {
        background: #e8e8e8;
        width: 120px;
        height: 120px;
        border-radius: 100%;
        border: 2px solid #fff;
        position: absolute;
        transform: translate(-50%, -50%);
        vertical-align: middle;
        left: 50%;
        z-index: 100;
    }

    .profile-image_svg:hover {
        transform: scale(1.1);
    }

    //custom animation
    .loading-image {
        position: absolute;
        /*48 is the size of loading*/
        left: calc(50% - 24px);
        top: calc(50% - 24px);
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
