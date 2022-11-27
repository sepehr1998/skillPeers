<template>
  <div>
    <div class="input-group">
      <div class="form-control p-0 no-border">
        <input
          v-model="search"
          @keyup.enter="enterClicked()"
          type="text"
          placeholder="skill, name ..."
          class="w-100 h-100 pl-2 search-box_input"
          aria-label="Text input with dropdown button"
          :class="isOpen?'no-bottom-border':''"
        />

        <!--<ul-->
          <!--v-show="isOpen"-->
          <!--class="autocomplete-results no-top-border rounded-bottom"-->
          <!--style="float: left;"-->
        <!--&gt;-->
          <!--<li-->
            <!--v-for="(result, i) in results"-->
            <!--:key="i"-->
            <!--@click="setResult(result)"-->
            <!--class="autocomplete-result"-->
          <!--&gt;{{ result }}</li>-->
        <!--</ul>-->
      </div>

      <!--<div class="input-group-append">-->
      <!--<base-dropdown class=" pr-0">-->
      <!--<div class="" slot="title">-->
      <!--<div class="sarch-selected-dropdown  float-left">-->
      <!--<span>{{ currentSearchMode }}</span>-->
      <!--</div>-->
      <!--<i class="ni ni-bold-down sarch-selected-donw-icon"></i>-->
      <!--</div>-->

      <!--<template>-->
      <!--<li-->
      <!--class="dropdown-item"-->
      <!--v-for="(itm, idx) in searchItems"-->
      <!--@click="changeSearchMode(idx)"-->
      <!--:key="idx"-->
      <!--&gt;-->
      <!--<i :class="itm.icon" :color="itm.iconColor"></i>-->
      <!--{{ itm.title }}-->
      <!--</li>-->
      <!--</template>-->
      <!--</base-dropdown>-->
      <!--</div>-->

      <div class="input-group-append search-box-button_container" @click="enterClicked()">
        <button type="button" class="btn btn-primary pl-2 pr-2">
          <span class="search-btn-text mr-1">Search</span>
          <i class="fa fa-search ml-0" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: function () {
    return {
      showSearchList: false,
      searchItems: [
        {
          title: "location",
          icon: "ni ni-pin-3",
          displaySearchBarTitle: "By Location",
          iconColor: "",
        },

        {
          title: "Skill",
          icon: "ni ni-air-baloon",
          displaySearchBarTitle: "By Skill",
          iconColor: "",
        },

        {
          title: "Name",
          icon: "ni ni-single-02",
          displaySearchBarTitle: "By Name",
          iconColor: "",
        },
      ],
      currentSearchMode: "By Name",
      search: "",
      results: [],
      isOpen: false,
    };
  },
  methods: {
    enterClicked() {
      let searchKey = this.getSearchKey();
      let path = "/users";
      if (this.search && this.search.trim() !== "") {
        path =
          path + "/" + searchKey + "/" + this.search.trim().toLocaleLowerCase();
      }

      this.$router.push({
        path: path,
      });
    },
    showList() {
      this.showSearchList = true;
    },
    hideList() {
      this.showSearchList = false;
    },
    changeSearchMode(selectedIdx) {
      this.currentSearchMode = this.searchItems[
        selectedIdx
      ].displaySearchBarTitle;
    },
    onChange() {
      if (this.search === undefined || this.search === "") {
        this.isOpen = false;
        this.results = [];
      } else {
        console.log(this.search);
        this.isOpen = true;
        this.filterResults();
      }
    },
    filterResults() {
      let searchKey = this.getSearchKey();
      if (searchKey === "skill") {
        this.$store
          .dispatch("search/searchSkills", {
            name: this.search.toLowerCase(),
          })
          .then((res) => {
            let names = res.map((skill) => skill.name);
            this.setAutoCompleteItems(names);
          })
          .catch((err) => {
            console.warn("failed loading skills ", err);
            this.$message({
              message: err.errorMessage,
              type: "error",
            });
          });
      } else if (searchKey === "name") {
        let name = this.search.toLowerCase();
        console.log("search name query: ", name);
        this.$store
          .dispatch("search/searchUsers", {
            firstName: name,
          })
          .then((res) => {
            let userNames = res.map((user) => user.firstName);
            console.log("REsult name :  ==>  ", userNames);
            this.setAutoCompleteItems(userNames);
          })
          .catch((err) => {
            console.warn("some problem while loading skills", err);
            this.$message({
              message: err.errorMessage,
              type: "error",
            });
          });
      }
    },
    setAutoCompleteItems(items) {
      //this.results = items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      this.results = items;
      if (this.results.length < 1) {
        this.isOpen = false;
      }
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.enterClicked();
    },
    getSearchKey() {
      return "term";
      // switch (this.currentSearchMode) {
      //     case "By Location":
      //         return "location";
      //     case "By Name":
      //         return "name";
      //     case "By Skill":
      //         return "skill";
      //     default:
      //         return "skill";
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-down-search {
  background-color: transparent;
  border-width: 1px !important;
  border-color: white !important;
  border-style: solid !important;
  padding: 10px !important;
  &:hover,
  &:active {
    color: white !important;
    background-color: transparent !important;
    border-color: white !important;
  }
}

::v-deep li.dropdown {
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px !important;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  border-radius: 0 5px 5px 0;
}

.sarch-selected-dropdown {
  color: white;
}

.sarch-selected-donw-icon {
  color: white;

  margin: 1px;
  margin-left: 5px;
}

/*auto complete*/
/*.autocomplete {*/
/*position: relative;*/
/*width: 130px;*/
/*}*/

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #5f4dee;
  color: white;
}

ul {
  list-style-type: none;
  background: #fff;
  width: 100%;
  padding-left: 0.25rem !important;
  cursor: -webkit-grab;
  cursor: grab;
}

li {
}

/*auto complete*/

.search-box_container {
}

.search-box_input {
  border-radius: 0.375rem;
  border: none;
}

.btn-border-white {
  border: 1px solid white;
}

.search-box-button_container {
  cursor: pointer !important;
  border: 2px solid white !important;
  border-top-right-radius: 0.375rem !important;
  border-bottom-right-radius: 0.375rem !important;
}

.btn-primary {
  border-top-right-radius: 0.375rem !important;
  border-bottom-right-radius: 0.375rem !important;
  color: #fff !important;
  background-color: #5f4dee !important;
  font: 700 0.875rem/0 "Open Sans", sans-serif !important;
  text-transform: capitalize !important;
  border: none !important;
}

/*.btn-primary:hover {*/
/*color:  #5f4dee !important;*/
/*background-color: #FFFFFF !important;*/
/*}*/

.search-box_input {
  outline: none;
}

.no-bottom-border {
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.no-border {
  border: none;
}

.no-top-border {
  border-top: none;
}

.rounded-bottom {
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}


@media screen and (max-width: 600px) {
  .search-btn-text {
    visibility: hidden;
    display: none;
  }
}
</style>
