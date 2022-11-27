<template>
    <div class="content-container pt-4 bg-white" ref="userlist-section">
        <div id="left-panel" class="left-nav-wrapper pt-2">


            <base-input
                    v-if="!isSearchedByTerm"
                    v-model="termSearch"
                    alternative
                    @keyup.enter="termSearchEnterClicked"
                    placeholder="skill, name ..."
                    class=" mb-1 mr-2 ml-2 mt-6"
                    input-classes="form-control"
            />


            <div class="row mb-1 mt-2 mr-2 ml-2 p-2"
                 :class="[ !isSearchedByTerm ? '' : 'mt-6' ]"
                 style="border: 1px solid #e9ecef">
                <el-radio-group class="ml-3" v-model="newSorting" size="small">
                    <div class="row">
                        <el-radio class="mr-1 ml-1 mt-1 mb-1" label="1">
                            <i class="fa fa-sort-asc fa-2" aria-hidden="true"></i>
                            Price Up <i class="fa fa-sort-asc"
                                        aria-hidden="true"></i>
                        </el-radio>
                    </div>
                    <div class="row">
                        <el-radio class="mr-1 ml-1 mt-1 mb-1" label="2">
                            Price Down <i class="fa fa-sort-desc"
                                          aria-hidden="true"></i>
                        </el-radio>
                    </div>
                </el-radio-group>
            </div>

            <div class="row mb-1 mt-2 mr-2 ml-2 p-2" style="border: 1px solid #e9ecef">
                <el-radio-group class="ml-3" v-model="newSorting" size="small" style="color: black !important;">
                    <div class="row">
                        <el-radio class="mr-1 ml-1 mt-1 mb-1" label="3">
                            Experience Up <i class="fa fa-sort-asc"
                                             aria-hidden="true"></i>
                        </el-radio>
                    </div>
                    <div class="row">
                        <el-radio class="mr-1 ml-1 mt-1 mb-1" label="4">
                            Experience Down <i class="fa fa-sort-desc"
                                               aria-hidden="true"></i>
                        </el-radio>
                    </div>
                </el-radio-group>
            </div>


<!--            &lt;!&ndash; Filter By Skills &ndash;&gt;-->
<!--            <div class="ml-2 mr-2 mb-2">-->
<!--                <el-collapse v-model="activeColumns" class="p-2">-->
<!--                    <custom-collapse-item title="Skills" name="Skills" class="border-0">-->
<!--                        <base-input-->
<!--                                v-model="skillFilterText"-->
<!--                                alternative-->
<!--                                placeholder="Skill Name"-->
<!--                                class="w-100 mb-1"-->
<!--                                input-classes="form-control"-->
<!--                        />-->
<!--                        <div class="el-card_container">-->
<!--                            <div v-for="skill in filteredSkills" :key="skill.skillId">-->
<!--                                <div class="custom-control custom-checkbox filter-item">-->
<!--                                    <input-->
<!--                                            type="checkbox"-->
<!--                                            v-model="skill.checked"-->
<!--                                            class="custom-control-input"-->
<!--                                            :id="skill.name"-->
<!--                                            @change="selectDeselectSkill($event, skill)"-->
<!--                                    />-->
<!--                                    <label class="custom-control-label" :for="skill.name">-->
<!--                                        {{-->
<!--                                        skill.name-->
<!--                                        }}-->
<!--                                    </label>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </custom-collapse-item>-->
<!--                </el-collapse>-->
<!--            </div>-->
<!--            &lt;!&ndash; Filter By Skills &ndash;&gt;-->

            <!-- Filter By Countries -->
            <div class="ml-2 mr-2 mb-2">
                <el-collapse v-model="activeColumns" class="p-2">
                    <custom-collapse-item title="Countries" name="Countries" class="border-0">
                        <base-input
                                v-model="countryFilterText"
                                alternative
                                placeholder="Country Name"
                                class="w-100 mb-1"
                                input-classes="form-control"
                        />
                        <div class="el-card_container">
                            <div v-for="country in filteredCountries" :key="country.id">
                                <div class="custom-control custom-checkbox filter-item">
                                    <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            :id="country.name"
                                            v-model="country.checked"
                                            @change="selectDeselectCountry($event, country)"
                                    />
                                    <label class="custom-control-label" :for="country.name">
                                        {{
                                        country.name
                                        }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </custom-collapse-item>
                </el-collapse>
            </div>
            <!-- Filter By Countries -->

<!--            &lt;!&ndash;Filter By Cities &ndash;&gt;-->
<!--            <div v-if="isSearchInUSA" class="ml-2 mr-2 mb-2">-->
<!--                <el-collapse v-model="activeColumns" class="p-2">-->
<!--                    <custom-collapse-item title="States" name="States" class="border-0">-->
<!--                        <base-input-->
<!--                                v-model="cityFilterText"-->
<!--                                alternative-->
<!--                                placeholder="City Name"-->
<!--                                class="w-100 mb-1"-->
<!--                                input-classes="form-control"-->
<!--                        />-->
<!--                        <div class="el-card_container">-->
<!--                            <div v-for="city in filteredCities" :key="city.id">-->
<!--                                <div class="custom-control custom-checkbox filter-item">-->
<!--                                    <input-->
<!--                                            type="checkbox"-->
<!--                                            class="custom-control-input"-->
<!--                                            :id="city.name"-->
<!--                                            v-model="city.checked"-->
<!--                                            @change="selectDeselectCity($event, city)"-->
<!--                                    />-->
<!--                                    <label class="custom-control-label" :for="city.name">-->
<!--                                        {{-->
<!--                                        city.name-->
<!--                                        }}-->
<!--                                    </label>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </custom-collapse-item>-->
<!--                </el-collapse>-->
<!--            </div>-->
<!--            &lt;!&ndash;Filter By Cities &ndash;&gt;-->
          <!-- Filter By Countries -->
          <div class="ml-2 mr-2 mb-2">
            <el-collapse v-model="activeColumns" class="p-2">
              <custom-collapse-item title="Languages" name="Languages" class="border-0">
                <base-input
                    v-model="languageFilterText"
                    alternative
                    placeholder="Language"
                    class="w-100 mb-1"
                    input-classes="form-control"
                />
                <div class="el-card_container">
                  <div v-for="language in filteredLanguages" :key="language.id">
                    <div class="custom-control custom-checkbox filter-item">
                      <input
                          type="checkbox"
                          class="custom-control-input"
                          :id="language.name"
                          v-model="language.checked"
                          @change="selectDeselectLanguage($event, language)"
                      />
                      <label class="custom-control-label" :for="language.name">
                        {{
                          language.name
                        }}
                      </label>
                    </div>
                  </div>
                </div>
              </custom-collapse-item>
            </el-collapse>
          </div>






          <div class="ml-2 mr-2 mb-2">
            <el-collapse v-model="activeColumns" class="p-2">
            <span style="font-size: 13px; color: #303133; font-family: 'Roboto'">
              Online Now
            </span>
              <span class="float-right" style="vertical-align: center">
            <div :class="{'active': toggleActive}" class="toggle_container">
                <ToggleButton color="#409EFF"
                    @change="triggerToggleEvent"
                              :value = false
                />
            </div>
              </span>
            </el-collapse>
          </div>
            <!--Filters-->
        </div>
        <div class="right-content-wrapper">
            <div class="content right-pan-normal-mode" style="display: block">
                <!--Pagination-->
                <div class="card text-center pt-3 border-0">
                    <div class="cards-container pt-3 pb-3 w-100">
                        <!--<div class="row mt-1 ml-4 mr-4 w-100">-->
                        <!--<div class="col-sm-6 col-md-3 col-lg-3 pl-1 pr-1 mt-1">-->
                        <!--<div class="form-group mb-3 has-label">-->
                        <!--<div>-->
                        <!--<label class="form-control-label">Search Column</label>-->
                        <!--</div>-->
                        <!--<el-select-->
                        <!--class="select-danger w-100"-->
                        <!--v-model="searchColumn"-->
                        <!--no-match-text="no match data"-->
                        <!--filterable-->
                        <!--placeholder-->
                        <!--no-data-text="No Column available"-->
                        <!--:default-first-option="false"-->
                        <!--&gt;-->
                        <!--<el-option-->
                        <!--class="select-danger"-->
                        <!--v-for="item in sortByItems"-->
                        <!--:key="item.id"-->
                        <!--:label="item.title"-->
                        <!--:value="item.name"-->
                        <!--&gt;</el-option>-->
                        <!--</el-select>-->
                        <!--</div>-->
                        <!--</div>-->

                        <!--<div class="col-sm-6 col-md-3 col-lg-3 pl-1 pr-1 mt-1">-->
                        <!--<div class="form-group mb-3 has-label">-->
                        <!--<div>-->
                        <!--<label class="form-control-label">Search Text</label>-->
                        <!--</div>-->
                        <!--<base-input-->
                        <!--v-model="searchText"-->
                        <!--@keyup.enter="searchEnterClicked"-->
                        <!--alternative-->
                        <!--placeholder-->
                        <!--class="w-100"-->
                        <!--:disabled="isSearchable"-->
                        <!--input-classes="form-control"-->
                        <!--/>-->
                        <!--</div>-->
                        <!--</div>-->

                        <!--<div class="col-sm-6 col-md-3 col-lg-3 pl-1 pr-1 mt-1">-->
                        <!--<div class="form-group mb-3 has-label">-->
                        <!--<div>-->
                        <!--<label class="form-control-label">Sort By</label>-->
                        <!--</div>-->
                        <!--<el-select-->
                        <!--class="select-danger w-100"-->
                        <!--v-model="selectedSortItem"-->
                        <!--no-match-text="no match data"-->
                        <!--filterable-->
                        <!--placeholder-->
                        <!--no-data-text="No Sort Item available"-->
                        <!--:default-first-option="false"-->
                        <!--&gt;-->
                        <!--<el-option-->
                        <!--class="select-danger"-->
                        <!--v-for="item in sortByItems"-->
                        <!--:key="item.id"-->
                        <!--:label="item.title"-->
                        <!--:value="item.name"-->
                        <!--&gt;</el-option>-->
                        <!--</el-select>-->
                        <!--</div>-->
                        <!--</div>-->

                        <!--<div class="col-sm-6 col-md-3 col-lg-3 pl-1 pr-1 mt-1">-->
                        <!--<div class="form-group mb-3 has-label">-->
                        <!--<div>-->
                        <!--<label class="form-control-label">Sort Mode</label>-->
                        <!--</div>-->
                        <!--<el-select-->
                        <!--class="select-danger w-100"-->
                        <!--v-model="currentSortMode"-->
                        <!--no-match-text="no match data"-->
                        <!--filterable-->
                        <!--placeholder-->
                        <!--no-data-text="No Sort Mode available"-->
                        <!--:default-first-option="false"-->
                        <!--:disabled="HaveSortByItem"-->
                        <!--&gt;-->
                        <!--<el-option-->
                        <!--class="select-danger"-->
                        <!--v-for="item in sortByModes"-->
                        <!--:key="item.id"-->
                        <!--:label="item.title"-->
                        <!--:value="item.name"-->
                        <!--&gt;</el-option>-->
                        <!--</el-select>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--</div>-->

                        <div class="row mt-1 ml-1 mr-1 w-100"></div>

                        <div v-if="!wattingForData && !users.length" class="notfound-container">
                            <img src="@/assets/other/4.png" alt="No image" width="50%"/>
                            <h2 class>Users Not Found</h2>
                            <p>
                                The users you are looking for might have been removed had Their
                                names or skills or locations changed or is temporarily
                                unavailable.
                            </p>
                        </div>

                        <!--Search Results-->
                        <div v-if="wattingForData">
                            <div class="waitting-container">
                                <i class="fa fa-circle-notch fa-spin fa-3x"></i>
                            </div>
                        </div>

                        <div v-else class="m-0 p-0 cards-container_inner">
                            <div class="user-card-data mt-5 mb-2 ml-2 mr-2" v-for="user in users" :key="user.id">
                                <user-card :cardData="user"></user-card>
                            </div>
                        </div>

                        <!--Search Results-->
                    </div>

                    <!--Pagination Numbers-->
                    <div v-if="users.length>0" class="card-footer border-0">
                        <custom-paginate
                                @changePage="onChangePage"
                                :initialPage="initialPage"
                                :pageSize="pageSize"
                                :currentPageNumber="currentPage"
                                :pageCount="pageCount"
                        ></custom-paginate>
                    </div>
                    <!--Pagination Numbers-->
                </div>
                <!--Pagination-->
            </div>
        </div>
    </div>
</template>


<script>
    import UserCard from "@/components/UserCard";
    import CustomPaginate from "./components/CustomPaginate";
    import CustomCollapseItem from "./components/CustomCollapseItem";
    //import SwitchButton from "@/components/switch-button";
    import ToggleButton from "@/components/ToggleButton/ToggleButton";
    const exampleItems = [...Array(30).keys()].map((i) => ({
        id: i + 1,
        name: "Item " + (i + 1),
    }));

    export default {
        name: "UsersList",
        components: {
            UserCard,
            CustomPaginate,
            CustomCollapseItem,
            ToggleButton,
        },
        props: {
            type: {
                type: String,
                default: "name",
            },
            like: {
                type: String,
                default: "",
            },
        },

        data: function () {
            return {
                toggleActive: true,
                activeColumns: ["Skills"],
                currentPage: 1,
                initialPage: 1,
                pageSize: 6,
                pageCount: 10,
                wattingForData: true,
                users: [],
                maxPages: 10,
                exampleItems,
                pageOfItems: [],
                skills: [],
                countries: [],
                newSorting: "1",
                languages: [],
                languageFilterText: "",
                skillFilterText: "",
                countryFilterText: "",
                inputSkills: [],
                inputLanguages: [],
                inputCountries: [],
                selectedSkills: [],
                selectedCountries: [],
                selectedLanguages: [],
                searchColumn: "",
                searchText: "",
                termSearch: "",
                isSearchedBefore: false,
                isOnlineFilter: false,
                selectedSortItem: "priceAvg",
                currentSortMode: "ascending",
                sortByItems: [
                    {
                        title: "First Name",
                        name: "firstName",
                        id: 1,
                    },
                    {
                        title: "Last Name",
                        name: "lastName",
                        id: 2,
                    },
                ],
                sortByModes: [
                    {
                        title: "Ascending",
                        name: "ascending",
                        id: 1,
                    },
                    {
                        title: "Descending",
                        name: "descending",
                        id: 2,
                    },
                ],
                usaCountryId: -1,
                isSearchInUSA: false,
            };
        },

        methods: {
          triggerToggleEvent(value) {
            this.isOnlineFilter = value;
            this.getResultsWithFilters(true);
          },

          toggle: function() {
            this.$emit("toggle", !this.isEnabled);
          },
            loadData() {
                let params = {};
                params.page = this.currentPage;
                params.size = this.pageSize;
                if (this.selectedSortItem && this.selectedSortItem !== "") {
                    params["sort[0].column"] = this.selectedSortItem;

                    if (this.currentSortMode && this.currentSortMode !== "") {
                        params["sort[0].type"] = this.currentSortMode.toUpperCase();
                    }
                }

                if (this.type === "name") {
                    params.firstName = this.like ? this.like : "";
                    this.searchByName(params);
                } else if (this.type === "term") {
                    params.term = this.like ? this.like : "";
                    this.searchByName(params);
                } else if (this.type === "skill") {
                    this.searchBySkills({
                        name: this.like ? this.like : "",
                    });
                } else if (this.type === "country") {
                    this.searchByCountries({
                        name: this.like ? this.like : "",
                    });
                } else if (this.type === "language") {
                    this.searchByLanguages({
                        name: this.like ? this.like : "",
                    });
                } else if (!this.type && !this.like) {
                    console.log("Loading all data");
                    this.searchByName(params);
                } else if (this.type === "isOnline"){
                  console.log("Loading all data");
                  this.searchByName(params);
                }
                else {
                    params.firstName = "";
                    this.searchByName(params);
                }
            },
            searchBySkills(params) {
                this.wattingForData = true;
                this.$store
                    .dispatch("search/searchSkills", params)
                    .then((res) => {
                        let data = [];
                        if (res && res.length) {
                            data = res;
                        }

                        Object.keys(data).forEach((key) => {
                            this.inputSkills.push(data[key].skillId);
                        });

                        //add for no skills
                        if (this.inputSkills.length < 1) {
                            this.inputSkills.push(-1);
                        }

                        this.removeInputSkillsFromSkills(this.inputSkills);

                        let params = {};
                        params.page = this.currentPage;
                        params.size = this.pageSize;
                        params.skillIds = this.inputSkills.join();
                        this.searchByName(params);
                    })
                    .catch((err) => {
                        console.warn("failed searching for skills", err);
                        this.wattingForData = false;
                    });
            },
            searchByCountries(params) {
                this.wattingForData = true;
                this.$store
                    .dispatch("location/getCountries", params)
                    .then((res) => {
                        let data = [];
                        if (res && res.length) {
                            data = res;
                        }

                        Object.keys(data).forEach((key) => {
                            this.inputCountries.push(data[key].id);
                        });

                        //add for no countries
                        if (this.inputCountries.length < 1) {
                            this.inputCountries.push(-1);
                        }

                        this.removeInputCountriesFromCountries(this.inputCountries);

                        let params = {};
                        params.page = this.currentPage;
                        params.size = this.pageSize;
                        params.countryIds = this.inputCountries.join();
                        this.searchByName(params);
                    })
                    .catch((err) => {
                        console.warn("failed searching for countries", err);
                        this.wattingForData = false;
                    });
            },
            searchByLanguages(params) {
                this.wattingForData = true;
                this.$store
                    .dispatch("location/getLanguages", params)
                    .then((res) => {
                        let data = [];
                        if (res && res.length) {
                            data = res;
                        }

                        Object.keys(data).forEach((key) => {
                            this.inputLanguages.push(data[key].id);
                        });

                        //add for no cities
                        if (this.inputLanguages.length < 1) {
                            this.inputLanguages.push(-1);
                        }

                        this.removeInputLanguagesFromLanguages(this.inputLanguages);

                        let params = {};
                        params.page = this.currentPage;
                        params.size = this.pageSize;
                        this.searchByName(params);
                    })
                    .catch((err) => {
                        console.warn("failed searching for cities", err);
                        this.wattingForData = false;
                    });
            },
            searchByName(params) {
                console.log("params=>", params);
                this.wattingForData = true;

                this.$store
                    .dispatch("search/searchUsers", params)
                    .then((res) => {
                        console.log("Results of searchUsers", res);

                        let temp = res;
                        temp.forEach((user) => {
                            user.communicationRateAvg = this.getRate(user.communicationRateAvg);
                            user.technicalRateAvg = this.getRate(user.technicalRateAvg);
                            user.timeRateAvg = this.getRate(user.timeRateAvg);
                        });

                        this.wattingForData = false;

                        this.users = temp;
                    })
                    .catch((err) => {
                        console.warn("Faild loading search data by name", err);
                        this.wattingForData = false;
                    });

                //update page count
                //clone object
                let countparams = JSON.stringify(params);
                countparams = JSON.parse(countparams);
                delete countparams.page;
                delete countparams.size;

                console.log("doc count params", countparams);

                this.calculatePageCount(countparams);
            },
            onChangePage(pageOfItems) {
                // update page of items

                //console.log(pageOfItems);

                if (this.currentPage !== pageOfItems) {
                    this.currentPage = pageOfItems;
                    this.getResultsWithFilters();

                    this.goto('userlist-section');
                }
            },
            goto(refName) {
                var element = this.$refs[refName];
                console.log(element);
                var top = element.offsetTop;
                window.scrollTo(0, top);
            },
            changeSortByItem() {
                // this.currentSortMode = "ascending";
                // this.changeSortByMode(true);
                this.getResultsWithFilters(true);
            },
            changeSortByMode(reload = false) {
                if (reload) {
                    this.getResultsWithFilters(true);
                }
            },
            selectDeselectSkill($event, skill) {
                skill.checked = $event.target.checked;
                if ($event.target.checked) {
                    this.selectedSkills.push(skill.skillId);
                } else {
                    const index = this.selectedSkills.indexOf(skill.skillId);
                    if (index > -1) {
                        this.selectedSkills.splice(index, 1);
                    }
                }
                this.getResultsWithFilters(true);
            },
            selectDeselectCountry($event, country) {
                country.checked = $event.target.checked;
                if ($event.target.checked) {
                    this.selectedCountries.push(country.id);

                    console.log("usa id", this.usaCountryId);

                    if (country.id == this.usaCountryId) {
                        this.isSearchInUSA = true;
                    }
                } else {
                    if (country.id == this.usaCountryId) {
                        this.isSearchInUSA = false;
                    }
                    const index = this.selectedCountries.indexOf(country.id);
                    if (index > -1) {
                        this.selectedCountries.splice(index, 1);
                    }
                }
                this.getResultsWithFilters(true);
            },
            selectDeselectLanguage($event, language) {
                console.log(language);
                language.checked = $event.target.checked;
                if ($event.target.checked) {
                    this.selectedLanguages.push(language.id);
                } else {
                    const index = this.selectedLanguages.indexOf(language.id);
                    if (index > -1) {
                        this.selectedLanguages.splice(index, 1);
                    }
                }
                this.getResultsWithFilters(true);
            },
            getResultsWithFilters(filtersChanged = false) {
                if (filtersChanged) {
                    this.currentPage = 1;
                }

                let params = this.getParams();

                this.searchByName(params);
            },
            getParams() {
                let params = {};
                params.page = this.currentPage;
                params.size = this.pageSize;

                let searchSkillIds = [];
                if (this.inputSkills.length > 0) {
                    console.log("add input skills");
                    searchSkillIds.push(this.inputSkills);
                }

                if (this.selectedSkills.length > 0) {
                    searchSkillIds.push(this.selectedSkills);
                }

                if (searchSkillIds.length > 0 && searchSkillIds.join()) {
                    params.skillIds = searchSkillIds.join();
                }

                let searchCountryIds = [];
                if (this.inputCountries.length > 0) {
                    console.log("add input countries", this.inputCountries.length);
                    searchCountryIds.push(this.inputCountries);
                }

                if (this.selectedCountries.length > 0) {
                    searchCountryIds.push(this.selectedCountries);
                }

                if (searchCountryIds.length > 0 && searchCountryIds.join()) {
                    params.countryIds = searchCountryIds.join();
                }

                let searchLanguageIds = [];
                if (this.inputLanguages.length > 0) {
                    console.log("add input Language");
                    searchLanguageIds.push(this.inputLanguages);
                }
                if (this.selectedLanguages.length > 0) {
                    searchLanguageIds.push(this.selectedLanguages);
                }

                if (searchLanguageIds.length > 0 && searchLanguageIds.join()) {
                    params.languageIds = searchLanguageIds.join();
                }

                if (this.selectedSortItem && this.selectedSortItem !== "") {
                    params["sort[0].column"] = this.selectedSortItem;

                    if (this.currentSortMode && this.currentSortMode !== "") {
                        params["sort[0].type"] = this.currentSortMode.toUpperCase();
                    }
                }

                if (this.searchColumn && this.searchColumn !== "") {
                    params[this.searchColumn] = this.searchText;
                }

                if (this.termSearch && this.termSearch !== "") {
                    params.term = this.termSearch;
                }


                if (this.type === "name") {
                    params.firstName = this.like ? this.like : "";
                } else if (this.type === "term") {
                    params.term = this.like ? this.like : "";
                }
                if (this.isOnlineFilter.value === true)
                  params.isOnline = this.isOnlineFilter.value;

                return params;
            },
            resetData() {
                this.currentPage = 1;
                this.initialPage = 1;
                this.pageSize = 6;
                this.pageCount = 10;
                this.wattingForData = true;
                this.users = [];
                this.maxPages = 10;
                this.exampleItems;
                this.pageOfItems = [];
                this.skills = [];
                this.countries = [];
                this.cities = [];
                this.inputSkills = [];
                this.inputLanguages = [];
                this.inputCountries = [];
                this.selectedSkills = [];
                this.selectedCountries = [];
                this.selectedLanguages = [];
                this.termSearch = "";
                this.selectedSortItem = "priceAvg";
                this.currentSortMode = "ascending";
            },
            removeInputLanguagesFromLanguages(inputLanguages) {
                this.cities = this.cities.filter(function (item) {
                    let contain = Object.values(inputLanguages).indexOf(item.id) >= 0;
                    return !contain;
                    // return !inputCities.includes(item.id);
                });
            },
            removeInputCountriesFromCountries(inputCountries) {
                this.countries = this.countries.filter(function (item) {
                    let contain = Object.values(inputCountries).indexOf(item.id) >= 0;
                    return !contain;
                    // return inputCountries.includes(item.id);
                });
            },
            removeInputSkillsFromSkills(inputSkills) {
                this.skills = this.skills.filter(function (item) {
                    let contain = Object.values(inputSkills).indexOf(item.skillId) >= 0;
                    // let contain = inputSkills.includes(item.skillId);
                    return !contain;
                });
            },
            changeSearchColumn() {
                console.log("search column", this.searchColumn);
                this.searchText = "";
                this.changeSearchText();
            },
            changeSearchText() {
                this.getResultsWithFilters(true);
            },
            searchEnterClicked() {
                this.changeSearchText();
            },
            termSearchEnterClicked() {
                this.getResultsWithFilters(true);
            },
            calculatePageCount(params) {
                //count users
                this.$store
                    .dispatch("search/countUsers", params)
                    .then((res) => {
                        this.pageCount = Math.floor((res + this.pageSize - 1) / this.pageSize);
                        console.log("document count", res);
                    })
                    .catch((err) => {
                        this.pageCount = 1;
                        console.warn("failed to get users count", err);
                    });
            },
            getRate(rate) {
                let outRate = Math.round(((rate / 2) + Number.EPSILON) * 10) / 10;
                return outRate;
            },
        },
        mounted() {
            this.resetData();

            this.calculatePageCount({});

            //fetch skills
            this.$store
                .dispatch("skill/getAllSkills", {
                    name: "",
                })
                .then((res) => {
                    this.skills = res;
                    this.removeInputSkillsFromSkills(this.inputSkills);
                })
                .catch((err) => {
                    console.warn("failed searching for skils", err);
                });

            let countryParams = {};
            countryParams.page = 1;
            countryParams.size = 300;

            this.$store
                .dispatch("location/getCountries", countryParams)
                .then((res) => {
                    this.countries = res;

                    this.countries.forEach((country) => {
                        if (country.name === "United States") {

                            let cityParams = {};
                            cityParams.page = 1;
                            cityParams.size = 300;
                            cityParams.countryId = country.id;

                            this.usaCountryId = country.id;

                            return;
                        }
                    });

                    this.removeInputCountriesFromCountries(this.inputCountries);
                })
                .catch((err) => {
                    console.warn("failed searching for countries", err);
                });
          let languageParams = {};
          languageParams.page = 1;
          languageParams.size = 300;
          this.$store
              .dispatch("location/getLanguages", languageParams)
              .then((res) => {
                this.languages = res;
                this.removeInputLanguagesFromLanguages(this.inputLanguages);
              })
              .catch((err) => {
                console.warn("failed searching for countries", err);
              });

            this.loadData();
        },
        watch: {
            type: function (newVal) {
                console.log("New Type:", newVal);
                this.loadData();
            },
            like: function (newVal) {
                console.log("New Like:", newVal);
                this.loadData();
            },
            searchColumn: function (newVal) {
                console.log("Search new column: ", newVal);
                if (this.isSearchedBefore) {
                    this.changeSearchColumn();
                }
                this.isSearchedBefore = true;
            },
            selectedSortItem: function (newVal) {
                console.log("SortBy new Value: ", newVal);
                if (this.currentSortMode && this.currentSortMode !== "") {
                    this.changeSortByItem();
                }
            },
            currentSortMode: function (newVal) {
                console.log("Sort mode new Value: ", newVal);
                this.changeSortByMode(true);
            },
            newSorting: function (newVal) {
                switch (newVal) {
                    case "1":
                        this.selectedSortItem = "priceAvg";
                        this.currentSortMode = "ascending";
                        break;
                    case "2":
                        this.selectedSortItem = "priceAvg";
                        this.currentSortMode = "descending";
                        break;
                    case "3":
                        this.selectedSortItem = "skills.percent";
                        this.currentSortMode = "ascending";
                        break;
                    case "4":
                        this.selectedSortItem = "skills.percent";
                        this.currentSortMode = "descending";
                        break;
                }


                //this.currentSortMode = newVal;
                //this.changeSortByMode(true);
            },
        },
        computed: {
            hasQueryResult() {
                return (
                    this.wattingForData === false &&
                    this.users !== undefined &&
                    this.users.length > 0
                );
            },
            getCurrentPageNum() {
                return this.currentPage;
            },
            HaveSortByItem() {
                return !(this.selectedSortItem && this.selectedSortItem !== "");
            },
            isSearchable() {
                return !(this.searchColumn && this.searchColumn !== "");
            },
            filteredSkills: function () {
                return this.skills.filter(
                    function (item) {
                        return (
                            item.name
                                .toLowerCase()
                                .indexOf(this.skillFilterText.toLowerCase()) !== -1
                        );
                    }.bind(this)
                );
            },
            filteredCountries: function () {
                return this.countries.filter(
                    function (item) {
                        return (
                            item.name
                                .toLowerCase()
                                .indexOf(this.countryFilterText.toLowerCase()) !== -1
                        );
                    }.bind(this)
                );
            },
            filteredLanguages: function () {
                return this.languages.filter(
                    function (item) {
                        return (
                            item.name
                                .toLowerCase()
                                .indexOf(this.languageFilterText.toLowerCase()) !== -1
                        );
                    }.bind(this)
                );
            },
            isSearchedByTerm: function () {
                return (this.type === "term");
            },
        },
    };
</script>

<style lang="scss" scoped>

    html {
        scroll-behavior: smooth;
    }

    .el-card__header {
        padding: 15px 15px 30px 5px !important;
    }

    .el-card_container {
        height: 220px;
        max-height: 270px !important;
        overflow-y: scroll !important;
        overflow-x: hidden !important;
    }

    .el-card {
        /*max-height: 300px !important;*/
        /*overflow: scroll;*/
        /*border: 1px red solid;*/
    }

    .el-collapse-item__header {
        text-align: center !important;
    }

    .el-collapse-item__content {
        padding-bottom: 0 !important;
    }

    .el-collapse-item__wrap {
        /*background: rebeccapurple;*/
    }

    .el-collapse {
        border: 1px solid #e9ecef;
    }

    .content-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 0rem !important;
    }

    .content-container .left-nav-wrapper {
        width: 320px;
        /*margin-left: 10px;*/
        /*margin-right: 10px;*/
        /*background: #5f4dee;*/
    }

    .content-container ul.navigation-panel {
        padding: 0px;
        margin: 0;
    }

    .content-container .left-nav-wrapper ul li {
        padding: 10px;
        list-style: none;
        border-bottom: 1px solid gray;
        background: #c1c1c1;
        cursor: pointer;
    }

    .content-container .left-nav-wrapper ul li.active {
        background: #efefef;
    }

    .content-container .right-content-wrapper {
        width: 100%;
        padding-left: 5px;
    }

    .content-container .right-content-wrapper p {
        margin-top: 0px;
    }

    .content-container .right-content-wrapper .content {
        display: none;
    }

    .cross-btn {
        display: none;
    }

    @media (max-width: 560px) {
        .content-container {
            flex-direction: column;
        }

        .left-nav-wrapper {
            background: #fff;
            width: 100% !important;
        }
    }

    .left-nav-wrapper {
        /*background: #e9ecef;*/
    }

    /*Pagination*/
    .pagination {
        justify-content: center;
        flex-wrap: wrap;
    }

    .waitting-container {
        width: 100%;
        height: 500px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cards-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        align-content: stretch;
    }

    .cards-container_inner {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        align-items: flex-start;
        align-content: start;
    }

    .user-card-data {
        width: 300px;
        height: 470px;
        margin: 10px;
    }

    .card card-profile {
        /*height: 500px !important;*/
    }

    .sortby-item {
        /*min-width: 100px;*/
    }

    div[data-proslinks-homepage] body,
    div[data-proslinks-homepage] p {
        color: #adb5bd;
    }

    .center-block {
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }

    /*Pagination*/

    .filter-item {
        margin: 10px;
    }

    .card-body {
        padding-top: 5px;
        padding-bottom: 5px;
        max-height: 250px;
        overflow-y: hidden;
    }

    .card-header {
        margin-top: 0;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .notfound-container {
        max-width: 400px;
        padding-right: 20px;
        padding-left: 20px;
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

      #userlist-section {
    }


</style>
