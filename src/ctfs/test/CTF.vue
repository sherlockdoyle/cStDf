<template>
  <div class="q">
    <div v-for="i in 21 * 21" :key="i" />
  </div>
</template>

<style scoped>
.q {
  display: grid;
  grid-template-rows: repeat(21, 1fr);
  grid-template-columns: repeat(21, 1fr);
  aspect-ratio: 1 / 1;
  width: 75vw;
  max-width: 512px;

  div {
    background: #000;

    &:nth-child(9n),
    &:nth-child(10n),
    &:nth-child(11n),
    &:nth-child(13n) {
      background: #fff;
    }
    &:nth-child(18n),
    &:nth-child(20n),
    &:nth-child(22n) {
      background: #000;
    }
    &:nth-child(23n),
    &:nth-child(24n),
    &:nth-child(25n),
    &:nth-child(32n),
    &:nth-child(37n),
    &:nth-child(38n),
    &:nth-child(40n),
    &:nth-child(41n),
    &:nth-child(44n) {
      background: #fff;
    }
    &:nth-child(45n),
    &:nth-child(46n),
    &:nth-child(50n) {
      background: #000;
    }
    &:nth-child(51n),
    &:nth-child(54n),
    &:nth-child(58n),
    &:nth-child(62n) {
      background: #fff;
    }
    &:nth-child(63n),
    &:nth-child(64n),
    &:nth-child(70n),
    &:nth-child(72n) {
      background: #000;
    }
    &:nth-child(73n) {
      background: #fff;
    }
    &:nth-child(74n),
    &:nth-child(77n),
    &:nth-child(78n) {
      background: #000;
    }
    &:nth-child(79n) {
      background: #fff;
    }
    &:nth-child(80n),
    &:nth-child(81n),
    &:nth-child(82n) {
      background: #000;
    }
    &:nth-child(83n),
    &:nth-child(86n) {
      background: #fff;
    }
    &:nth-child(88n) {
      background: #000;
    }
    &:nth-child(90n) {
      background: #fff;
    }
    &:nth-child(91n) {
      background: #000;
    }
    &:nth-child(93n),
    &:nth-child(94n),
    &:nth-child(95n),
    &:nth-child(97n) {
      background: #fff;
    }
    &:nth-child(99n) {
      background: #000;
    }
    &:nth-child(100n) {
      background: #fff;
    }
    &:nth-child(102n) {
      background: #000;
    }
    &:nth-child(107n),
    &:nth-child(109n),
    &:nth-child(110n) {
      background: #fff;
    }
    &:nth-child(114n),
    &:nth-child(116n),
    &:nth-child(117n),
    &:nth-child(120n) {
      background: #000;
    }
    &:nth-child(122n) {
      background: #fff;
    }
    &:nth-child(130n),
    &:nth-child(132n) {
      background: #000;
    }
    &:nth-child(135n),
    &:nth-child(137n),
    &:nth-child(139n) {
      background: #fff;
    }
    &:nth-child(143n),
    &:nth-child(146n),
    &:nth-child(152n),
    &:nth-child(153n),
    &:nth-child(161n),
    &:nth-child(165n),
    &:nth-child(166n),
    &:nth-child(168n),
    &:nth-child(170n),
    &:nth-child(171n) {
      background: #000;
    }
    &:nth-child(173n),
    &:nth-child(176n),
    &:nth-child(177n),
    &:nth-child(182n) {
      background: #fff;
    }
    &:nth-child(186n) {
      background: #000;
    }
    &:nth-child(189n) {
      background: #fff;
    }
    &:nth-child(190n) {
      background: #000;
    }
    &:nth-child(191n) {
      background: #fff;
    }
    &:nth-child(194n) {
      background: #000;
    }
    &:nth-child(197n),
    &:nth-child(198n),
    &:nth-child(199n) {
      background: #fff;
    }
    &:nth-child(200n) {
      background: #000;
    }
    &:nth-child(201n),
    &:nth-child(202n),
    &:nth-child(203n) {
      background: #fff;
    }
    &:nth-child(205n),
    &:nth-child(208n),
    &:nth-child(209n) {
      background: #000;
    }
    &:nth-child(210n) {
      background: #fff;
    }
    &:nth-child(214n) {
      background: #000;
    }
    &:nth-child(217n) {
      background: #fff;
    }
    &:nth-child(220n),
    &:nth-child(221n) {
      background: #000;
    }
    &:nth-child(222n),
    &:nth-child(223n) {
      background: #fff;
    }
    &:nth-child(224n) {
      background: #000;
    }
    &:nth-child(228n),
    &:nth-child(229n),
    &:nth-child(230n),
    &:nth-child(231n),
    &:nth-child(232n),
    &:nth-child(233n),
    &:nth-child(235n),
    &:nth-child(236n),
    &:nth-child(242n),
    &:nth-child(245n) {
      background: #fff;
    }
    &:nth-child(248n) {
      background: #000;
    }
    &:nth-child(250n),
    &:nth-child(252n) {
      background: #fff;
    }
    &:nth-child(253n) {
      background: #000;
    }
    &:nth-child(254n),
    &:nth-child(256n) {
      background: #fff;
    }
    &:nth-child(261n) {
      background: #000;
    }
    &:nth-child(262n),
    &:nth-child(263n),
    &:nth-child(264n),
    &:nth-child(265n) {
      background: #fff;
    }
    &:nth-child(266n) {
      background: #000;
    }
    &:nth-child(268n),
    &:nth-child(269n) {
      background: #fff;
    }
    &:nth-child(270n) {
      background: #000;
    }
    &:nth-child(272n) {
      background: #fff;
    }
    &:nth-child(274n),
    &:nth-child(275n),
    &:nth-child(278n),
    &:nth-child(279n),
    &:nth-child(285n) {
      background: #000;
    }
    &:nth-child(286n),
    &:nth-child(288n),
    &:nth-child(289n) {
      background: #fff;
    }
    &:nth-child(291n) {
      background: #000;
    }
    &:nth-child(292n) {
      background: #fff;
    }
    &:nth-child(299n),
    &:nth-child(300n) {
      background: #000;
    }
    &:nth-child(303n),
    &:nth-child(306n),
    &:nth-child(308n) {
      background: #fff;
    }
    &:nth-child(310n) {
      background: #000;
    }
    &:nth-child(311n),
    &:nth-child(312n),
    &:nth-child(313n) {
      background: #fff;
    }
    &:nth-child(316n) {
      background: #000;
    }
    &:nth-child(317n),
    &:nth-child(318n),
    &:nth-child(320n),
    &:nth-child(324n) {
      background: #fff;
    }
    &:nth-child(325n) {
      background: #000;
    }
    &:nth-child(326n) {
      background: #fff;
    }
    &:nth-child(327n) {
      background: #000;
    }
    &:nth-child(329n),
    &:nth-child(330n),
    &:nth-child(331n),
    &:nth-child(332n) {
      background: #fff;
    }
    &:nth-child(333n) {
      background: #000;
    }
    &:nth-child(334n),
    &:nth-child(335n) {
      background: #fff;
    }
    &:nth-child(341n) {
      background: #000;
    }
    &:nth-child(342n) {
      background: #fff;
    }
    &:nth-child(344n) {
      background: #000;
    }
    &:nth-child(347n),
    &:nth-child(350n),
    &:nth-child(351n) {
      background: #fff;
    }
    &:nth-child(352n) {
      background: #000;
    }
    &:nth-child(353n) {
      background: #fff;
    }
    &:nth-child(354n),
    &:nth-child(357n) {
      background: #000;
    }
    &:nth-child(359n) {
      background: #fff;
    }
    &:nth-child(364n),
    &:nth-child(365n) {
      background: #000;
    }
    &:nth-child(367n),
    &:nth-child(370n),
    &:nth-child(374n) {
      background: #fff;
    }
    &:nth-child(376n),
    &:nth-child(377n),
    &:nth-child(378n) {
      background: #000;
    }
    &:nth-child(380n) {
      background: #fff;
    }
    &:nth-child(382n) {
      background: #000;
    }
    &:nth-child(384n) {
      background: #fff;
    }
    &:nth-child(387n) {
      background: #000;
    }
    &:nth-child(388n),
    &:nth-child(389n),
    &:nth-child(390n) {
      background: #fff;
    }
    &:nth-child(394n),
    &:nth-child(396n) {
      background: #000;
    }
    &:nth-child(397n),
    &:nth-child(399n),
    &:nth-child(401n) {
      background: #fff;
    }
    &:nth-child(406n),
    &:nth-child(407n) {
      background: #000;
    }
    &:nth-child(410n),
    &:nth-child(412n),
    &:nth-child(414n),
    &:nth-child(418n),
    &:nth-child(419n) {
      background: #fff;
    }
    &:nth-child(423n),
    &:nth-child(425n) {
      background: #000;
    }
    &:nth-child(429n),
    &:nth-child(431n),
    &:nth-child(432n),
    &:nth-child(433n) {
      background: #fff;
    }
    &:nth-child(434n),
    &:nth-child(436n) {
      background: #000;
    }
    &:nth-child(438n) {
      background: #fff;
    }
  }
}
</style>
