<script>
export default {
  name: "HowToUse",
  components: {},
  data() {
    return {
      fields: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    };
  },
  methods: {
    submitForm(event) {
      event.target.classList.add("was-validated");
      // submit form
    }
  }
};
</script>
<style scoped>
.container {
  text-align: center;
}

.main-timeline {
  font-family: "Poppins", sans-serif;
  position: relative;
}
.main-timeline:after {
  content: "";
  display: block;
  clear: both;
}
.main-timeline .timeline {
  width: 50%;
  padding: 30px 0 0;
  margin: 0 30px 20px 0;
  float: left;
}
.main-timeline .timeline-content {
  color: #333;
  background: linear-gradient(to left bottom, #f1eff0, #fefefe);
  min-height: 140px;
  padding: 0 25px 25px 30px;
  border: 2px solid #fff;
  border-radius: 70px;
  display: block;
  position: relative;
}
.main-timeline .timeline-content:hover {
  text-decoration: none;
}
.main-timeline .timeline-icon {
  color: #fff;
  background: linear-gradient(45deg, #45cafc, #49cafc 50%, #303f9f);
  font-size: 45px;
  text-align: center;
  line-height: 150px;
  height: 150px;
  width: 150px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  position: absolute;
  top: -32px;
  right: -75px;
  z-index: 1;
}
.main-timeline .timeline-icon:before {
  content: "";
  background: #49cafc;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  width: 72%;
  height: 72%;
  top: 50%;
  left: 50%;
  z-index: -1;
}
.main-timeline .title {
  color: #fff;
  background: linear-gradient(45deg, #45cafc, #49cafc 50%, #303f9f);
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 40px;
  margin: -22px 0 20px 80px;
  clip-path: polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 0 50%);
}
.main-timeline .description {
  font-size: 14px;
  letter-spacing: 1px;
  text-align: justify;
  margin: 0 65px 0 0;
}
.main-timeline .timeline:nth-child(even) {
  float: right;
  margin: 0 0 20px 30px;
}
.main-timeline .timeline:nth-child(even) .timeline-icon {
  right: auto;
  left: -75px;
}
.main-timeline .timeline:nth-child(even) .title {
  margin-left: 0;
  margin-right: 80px;
  padding-left: 50px;
  clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0);
}
.main-timeline .timeline:nth-child(even) .description {
  margin: 0 0 0 65px;
}

@media screen and (max-width: 990px) {
  .main-timeline .timeline .title {
    margin-left: 15px;
  }
  .main-timeline .timeline:nth-child(even) .title {
    margin-right: 15px;
  }
}
@media screen and (max-width: 767px) {
  .main-timeline .timeline {
    width: 100%;
  }
  .main-timeline .timeline .timeline-content {
    min-height: auto;
  }
  .main-timeline .timeline .timeline-icon {
    font-size: 35px;
    line-height: 83px;
    height: 80px;
    width: 80px;
    right: auto;
    left: 0;
  }
  .main-timeline .timeline:nth-child(even) .timeline-icon {
    left: 0;
  }
  .main-timeline .timeline .title {
    padding-right: 20px;
    margin-bottom: 30px;
    display: inline-block;
    clip-path: polygon(95% 0, 100% 50%, 95% 100%, 0 100%, 0 0);
  }
  .main-timeline .timeline:nth-child(even) .title {
    margin-right: 0;
    margin-left: 15px;
  }
  .main-timeline .timeline .description,
  .main-timeline .timeline:nth-child(even) .description {
    margin: 0;
  }
  .main-timeline .timeline-icon {
    right: -150px;
  }
}
@media screen and (max-width: 576px) {
  .main-timeline .title {
    font-size: 18px;
  }
}
.limit-width-600 {
  max-width: 600px;
}
</style>
