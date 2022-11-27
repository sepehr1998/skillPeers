<template>
    <contact-us></contact-us>
</template>
<script>
export default {
  name: "HomeBody",
  data: function () {
    return {
      topUsers: [
        // {
        //   id: "",
        //   image: "",
        //   title: "",
        //   comment:""
        //   price: "",
        //   tags: ["", ""]
        // }
      ],
    };
  },
  components: {
    ContactUs,
  },
  methods: {
    topUsersList() {
      let items = [];
      let objArr = [
        {
          type: "Android",
          icon: "android",
          icon_type: "fab",
          title: "kotlin",
          text:
            "Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference. Kotlin is designed to interoperate fully with Java, and the JVM version of its standard library depends on the Java Class Library, but type inference allows its syntax to be more concise",
        },
        {
          type: "IOS",
          icon: "apple",
          icon_type: "fab",
          title: "swift",
          text:
            "Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. for iOS, iPadOS, macOS, watchOS, tvOS, and Linux. Swift is designed to work with Apple's Cocoa and Cocoa Touch frameworks and the large body of existing Objective-C code written for Apple products.",
        },
        {
          type: "Managment",
          icon: "drafting-compass",
          title: "Git",
          text:
            "Git is a distributed version-control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files. Its goals include speed, data integrity, and support for distributed, non-linear workflows",
        },
        {
          type: "Map",
          icon: "map-marked-alt",
          title: "GeoServer",
          text:
            "GeoServer is an open-source server written in Java that allows users to share, process and edit geospatial data. Designed for interoperability, it publishes data from any major spatial data source using open standards",
        },
        {
          type: "Photography",
          icon: "camera-retro",
          title: "GoPro",
          text:
            "As in other arts, the definitions of amateur and professional are not entirely categorical.An amateur photographer takes snapshots for pleasure to remember events, places or friends with no intention of selling the images to others",
        },
        {
          type: "designer",
          icon: "palette",
          icon_mode: "",
          title: "Photoshop",
          text:
            "Adobe Photoshop is a raster graphics editor developed and published by Adobe Inc. for Windows and macOS. It was originally created in 1988 by Thomas and John Knoll. Since then, the software has become the industry standard not ....",
        },
      ];
      for (let i = 0; i < objArr.length; i++) {
        let img = require("@/assets/img/" + ((i % 8) + 1) + ".jpg");
        items.push({
          id: `element_${i}`,
          image: img,
          liked: Math.random() <= 0.35,
          title: objArr[i].title,
          type: objArr[i].type,
          icon: objArr[i].icon,
          icon_type: objArr[i].icon_type,
          price: Math.floor(Math.random() * 1000) + 500,
          stars: Math.floor(Math.random() * 5),
          comment: objArr[i].text,
          tags: [`tag_${Math.random() * 10}`, `tag_${Math.random() * 10}`],
        });
      }
      return items;
    },
    go2UsersPage() {
      this.$router.push("/users");
    },
    showAll() {
      this.$router.push("/users");
    },
    goTo(address) {
      this.$router.push(address);
    },
      showConstructionModal() {
          this.$store.dispatch("underConstructionModal/showModal");
      },
  },
  mounted: function () {
    // this.$store
    //   .dispatch("search/searchUsers", {})
    //   .then((res) => {
    //     this.topUsers = res.slice(0, 15);
    //   })
    //   .catch((err) => {
    //     console.warn("problem loading top users", err);
    //   });
  },
};
</script>
<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
