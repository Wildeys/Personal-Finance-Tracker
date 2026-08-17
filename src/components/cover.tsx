/* eslint-disable max-lines-per-function */
import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Line,
  Path,
  Rect,
  Stop,
  Text,
} from 'react-native-svg';

export const Cover = (props: SvgProps) => (
  <Svg
    viewBox="0 0 640 520"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <Defs>
      <LinearGradient
        id="coverBgGradient"
        x1="120"
        y1="40"
        x2="520"
        y2="470"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#EAF8EF" />
        <Stop offset="1" stopColor="#F7FCF8" />
      </LinearGradient>

      <LinearGradient
        id="coverGreenGradient"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <Stop offset="0" stopColor="#29A34A" />
        <Stop offset="1" stopColor="#148535" />
      </LinearGradient>
    </Defs>

    {/* Background */}
    <Path
      d="M117 94C159 26 277 22 351 52C436 86 532 160 532 269C532 391 432 469 306 469C185 469 82 407 83 290C83 211 78 158 117 94Z"
      fill="url(#coverBgGradient)"
    />

    <Circle cx="523" cy="107" r="24" fill="#DDF4E4" />
    <Circle cx="105" cy="373" r="18" fill="#DDF4E4" />

    {/* Pie chart */}
    <Circle cx="112" cy="128" r="44" fill="#D9F1DF" />

    <Path
      d="M112 128V84C134 84 152 100 156 121L112 128Z"
      fill="#59B96D"
    />

    <Path
      d="M112 128L156 121C159 141 148 159 130 168L112 128Z"
      fill="#2A9D4B"
    />

    <Path
      d="M112 128L130 168C105 180 76 164 69 137L112 128Z"
      fill="#177E35"
    />

    <Path
      d="M112 128L69 137C64 115 74 96 91 87L112 128Z"
      fill="#34A853"
    />

    {/* Growth icon */}
    <Circle
      cx="526"
      cy="148"
      r="42"
      fill="url(#coverGreenGradient)"
    />

    <Path
      d="M503 162L516 149L527 157L548 132"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Path
      d="M536 132H548V144"
      stroke="#FFFFFF"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Bank card */}
    <G transform="translate(65 220) rotate(-8)">
      <Rect width="92" height="58" rx="12" fill="#102A43" />

      <Rect
        y="11"
        width="92"
        height="11"
        fill="#173B5C"
      />

      <Rect
        x="12"
        y="31"
        width="36"
        height="6"
        rx="3"
        fill="#FFFFFF"
      />

      <Rect
        x="12"
        y="43"
        width="25"
        height="5"
        rx="2.5"
        fill="#C9D7E3"
      />

      <Circle
        cx="72"
        cy="40"
        r="9"
        fill="#7ACB6C"
      />
    </G>

    {/* Phone */}
    <Rect
      x="258"
      y="62"
      width="240"
      height="386"
      rx="36"
      fill="#102A43"
    />

    <Rect
      x="270"
      y="75"
      width="216"
      height="360"
      rx="26"
      fill="#FFFFFF"
    />

    <Rect
      x="338"
      y="75"
      width="80"
      height="18"
      rx="9"
      fill="#102A43"
    />

    {/* Balance */}
    <Text
      x="378"
      y="130"
      textAnchor="middle"
      fontSize="15"
      fill="#627284"
    >
      Total Balance
    </Text>

    <Text
      x="378"
      y="165"
      textAnchor="middle"
      fontSize="28"
      fontWeight="700"
      fill="#188A38"
    >
      Rf 3,850.00
    </Text>

    {/* Income / Expense */}
    <Rect
      x="292"
      y="188"
      width="172"
      height="74"
      rx="14"
      fill="#F8FBF9"
      stroke="#E2EBE5"
    />

    <Text
      x="312"
      y="214"
      fontSize="12"
      fill="#188A38"
    >
      Income
    </Text>

    <Text
      x="312"
      y="237"
      fontSize="15"
      fontWeight="700"
      fill="#188A38"
    >
      + Rf 5,100
    </Text>

    <Line
      x1="378"
      y1="201"
      x2="378"
      y2="249"
      stroke="#E2EBE5"
    />

    <Text
      x="395"
      y="214"
      fontSize="12"
      fill="#E53935"
    >
      Expense
    </Text>

    <Text
      x="395"
      y="237"
      fontSize="15"
      fontWeight="700"
      fill="#E53935"
    >
      - Rf 1,250
    </Text>

    {/* Recent transactions */}
    <Text
      x="292"
      y="292"
      fontSize="14"
      fontWeight="700"
      fill="#183042"
    >
      Recent Transactions
    </Text>

    {/* Salary */}
    <Circle
      cx="307"
      cy="322"
      r="15"
      fill="#1F9A43"
    />

    <Path
      d="M307 313V331M300 324L307 331L314 324"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Text
      x="332"
      y="318"
      fontSize="13"
      fontWeight="700"
      fill="#183042"
    >
      Salary
    </Text>

    <Text
      x="332"
      y="337"
      fontSize="10"
      fill="#7A8793"
    >
      18 May 2026
    </Text>

    <Text
      x="454"
      y="326"
      textAnchor="end"
      fontSize="12"
      fontWeight="700"
      fill="#188A38"
    >
      +Rf 2,000
    </Text>

    <Line
      x1="292"
      y1="350"
      x2="464"
      y2="350"
      stroke="#EDF1EE"
    />

    {/* Groceries */}
    <Circle
      cx="307"
      cy="377"
      r="15"
      fill="#F04444"
    />

    <Path
      d="M307 386V368M300 375L307 368L314 375"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Text
      x="332"
      y="373"
      fontSize="13"
      fontWeight="700"
      fill="#183042"
    >
      Groceries
    </Text>

    <Text
      x="332"
      y="392"
      fontSize="10"
      fill="#7A8793"
    >
      17 May 2026
    </Text>

    <Text
      x="454"
      y="381"
      textAnchor="end"
      fontSize="12"
      fontWeight="700"
      fill="#E53935"
    >
      -Rf 75.40
    </Text>



    {/* Wallet */}
    <Rect
      x="462"
      y="382"
      width="120"
      height="89"
      rx="17"
      fill="#102A43"
    />

    <Rect
      x="507"
      y="408"
      width="82"
      height="38"
      rx="12"
      fill="#173B5C"
    />

    <Circle
      cx="523"
      cy="427"
      r="7"
      fill="#73C567"
    />

    <Path
      d="M482 386L548 386L539 364L492 372L482 386Z"
      fill="#41AE54"
    />

    {/* Coins */}
    <Ellipse
      cx="437"
      cy="453"
      rx="29"
      ry="10"
      fill="#E8A820"
    />

    <Rect
      x="408"
      y="437"
      width="58"
      height="18"
      fill="#F4B82F"
    />

    <Ellipse
      cx="437"
      cy="437"
      rx="29"
      ry="10"
      fill="#FFD15C"
    />

    <Ellipse
      cx="486"
      cy="460"
      rx="28"
      ry="28"
      fill="#F4B82F"
    />

    <Ellipse
      cx="486"
      cy="456"
      rx="28"
      ry="28"
      fill="#FFD15C"
    />

    <Text
      x="486"
      y="464"
      textAnchor="middle"
      fontSize="18"
      fontWeight="700"
      fill="#FFFFFF"
    >
      Rf
    </Text>

    {/* Decorative plants */}
    <Path
      d="M78 427C73 382 91 348 123 329C132 374 112 410 78 427Z"
      fill="#67BD68"
    />

    <Path
      d="M82 432C111 394 142 385 171 392C151 426 118 441 82 432Z"
      fill="#2D9E48"
    />

    <Path
      d="M567 352C564 316 579 291 605 278C611 314 597 339 567 352Z"
      fill="#61B865"
    />

    <Path
      d="M566 361C591 333 614 328 634 334C618 361 593 370 566 361Z"
      fill="#2E9B47"
    />
  </Svg>
);

export default Cover;