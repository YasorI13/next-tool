CREATE TABLE SupClass (
    AsstSupNo VARCHAR(10) PRIMARY KEY,
    SupClassName VARCHAR(255) NOT NULL
);

INSERT INTO SupClass (AsstSupNo, SupClassName) VALUES
('0101000', 'COST OF LAND'),
('0102000', 'LAND PROCUREMENT & IMPROVEMENT'),
('0201000', 'COST OF LAND FOR IMPROVEMENT'),
('0202000', 'LAND PROCUREMENT & IMPROVEMENT(LAND FOR IMPROVE.)'),
('0301000', 'BARGE DOCK FACILITIES, RIVER FRONT'),
('0302000', 'RAIL ROAD'),
('0303100', 'ASPHALT,CONCREATE PAVED ROAD'),
('0303200', 'LATENATE,GRAVEL PAVED ROAD'),
('0303300', 'DRAINAGE SYSTEM'),
('0303400', 'CABLE TRENCH'),
('0304100', 'ASPHALT,CONCRETE ROAD (OUTSIDE)'),
('0304200', 'LATENATE,GRAVEL ROAD (OUTSIDE)'),
('0304300', 'DRAINAGE SYSTEM (OUTSIDE)'),
('0305000', 'BRIDGE'),
('0306000', 'BRIDGE (OUTSIDE)'),
('0307100', 'CONCRETE FENCE'),
('0307200', 'GALVANIZED FENCE'),
('0307300', 'BARBED-WIRE'),
('0307400', 'Concrete Flood Wall and Gutter'),
('0308000', 'GATE AND GUARDHOUSE'),
('0309000', 'LANDSCAPING'),
('0311000', 'POND'),
('0312000', 'AIR FIELD'),
('0313000', 'AIRPLANE AND HELICOPTER HOUSE'),
('0314000', 'SOUND BARRIER WALL'),
('0315000', 'ONLINE COMMUNICATION AND CLOSE CIRCUIT'),
('0315100', 'INTRUSION SYSTEM'),
('0316000', 'TELECONFERENCE'),
('0317000', 'GAGING STATION'),
('0318100', 'OFFICE BUILDING'),
('0318200', 'OFFICE BUILDING - FIXTURE'),
('0318300', 'OFFICE BUILDING - AIR CONDITIONING SYSTEM'),
('0318400', 'OFFICE BUILDING - ELEVATOR'),
('0318700', 'OFFICE BUILDING - FIRE PROTECTION SYSTEM'),
('0318B00', 'OFFICE BUILDING - DOOR ACCESS CONTROL'),
('0318H00', 'OFFICE BUILDING - ONLINE COMMUNICATION AND CCTV'),
('0318I00', 'OFFICE BUILDING - POWER MONITORING'),
('0319100', 'WAREHOUSE'),
('0319200', 'WAREHOUSE - FIXTURE'),
('0319300', 'WAREHOUSE - AIR CONDITIONING SYSTEM'),
('0319400', 'WAREHOUSE - ELEVATOR'),
('0319700', 'WAREHOUSE - FIRE PROTECTION SYSTEM'),
('0319800', 'WAREHOUSE - SHELF'),
('0321100', 'SHOP'),
('0321200', 'SHOP - FIXTURE'),
('0321300', 'SHOP - AIR CONDITIONING SYSTEM'),
('0321700', 'SHOP - FIRE PROTECTION SYSTEM'),
('0321900', 'SHOP - CRANE'),
('0321H00', 'SHOP - ONLINE COMMUNICATION AND CLOSE CIRCUIT');
('0322000', 'OPEN CONCRETE STORAGE'),
('0323000', 'GARAGE / BUS SHETTER'),
('0324100', 'PARKING BUILDING'),
('0324400', 'PARKING BUILDING - ELEVATOR'),
('0324700', 'PARKING BUILDING - FIRE PROTECTION SYSTEM'),
('0325000', 'GASOLINE STATION'),
('0326000', 'POLICE STATION'),
('0327000', 'MACHINERIES STOREHOUSE'),
('0328000', 'ELECTRICAL SUPPLY SYSTEM'),
('0328100', 'ELECTRICAL SUPPLY SYSTEM - SOLAR CELL'),
('0329100', 'WATER SUPPLIES SYSTEM'),
('0329200', 'CONCRETE TOWER TANK'),
('0329300', 'WATER STORAGE TANK'),
('0329400', 'WATER FILTER PLANT'),
('0329500', 'WATER PUMP SYSTEM'),
('0331000', 'FIRE PROTECTION SYSTEM'),
('0332000', 'WASTE TREATMENT SYSTEM'),
('0333000', 'HOUSE'),
('0333100', 'HOUSE - FIXTURE'),
('0334100', 'GUEST HOUSE'),
('0334200', 'GUEST HOUSE - FIXTURE'),
('0334300', 'Guest House - Air conditioning system'),
('0335100', 'FLAT'),
('0335200', 'FLAT - FIXTURE'),
('0335400', 'FLAT - ELEVATOR'),
('0335700', 'FLAT - FIRE PROTECTION SYSTEM'),
('0336000', 'FLOAT - GUEST HOUSE'),
('0337100', 'MESSHALL AND LAUNDRY'),
('0337200', 'MESSHALL - FIXTURE'),
('0337300', 'MESS HALL - AIR CONDITIONING SYSTEM'),
('0337400', 'MESS HALL - ELEVATOR'),
('0337700', 'MESSHALL - FIRE PROTECTION SYSTEM'),
('0337B00', 'MESSHALL - DOOR ACCESS CONTROL'),
('0337H00', 'MESSHALL - ONLINE COMMUNICATION AND CLOSE CIRCUIT'),
('0337I00', 'MESSHALL - POWER MONITORING'),
('0338100', 'HOSPITAL'),
('0338200', 'HOSPITAL - FIXTURE'),
('0338300', 'HOSPITAL - AIR CONDITIONING SYSTEM'),
('0338400', 'HOSPITAL - ELEVATOR'),
('0338700', 'HOSPITAL - FIRE PROTECTION SYSTEM'),
('0339000', 'SCHOOL'),
('0341000', 'PAVILION'),
('0342100', 'ASSEMBLY HALL AND TRAINING CENTER'),
('0342200', 'ASSEMBLY HALL - FIXTURE'),
('0342300', 'ASSEMBLY HALL - AIR CONDITIONING SYSTEM'),
('0342400', 'ASSEMBLY HALL - ELEVATOR'),
('0342700', 'ASSEMBLY HALL - FIRE PROTECTION SYSTEM'),
('0342B00', 'ASSEMBLY HALL - DOOR ACCESS CONTROL'),
('0342H00', 'ASSEMBLY HALL - ONLINE COMMUNICATION AND CCTV'),
('0343000', 'SPORT SHED'),
('0344000', 'PLAYGROUND'),
('0345000', 'MARKET'),
('0346000', 'ARCADE / WALKER WAY / COVER SHED'),
('0347000', 'EARTHQUAKE MONITORING STATION'),
('0347100', 'WATER PRESSURE AND MOVEMENT MONITORING SYSTEM'),
('0348000', 'AMBIENT AIR QUALITY MONITORING STATION'),
('0349000', 'ACCESS TUNNEL TO POWER HOUSE'),
('0351000', 'METEOROLOGICAL STATION'),
('0352000', 'DIKE AND DIVERSION CANAL'),
('0353100', 'WEIGHINE MACHINE BUILDING'),
('0353D00', 'WEIGHINE MACHINE'),
('0354100', 'SILO'),
('0354200', 'FLY ASH BLENDING SYSTEM'),
('0354300', 'TRUCK CLEANING SYSTEM'),
('0354400', 'FLY ASH BLENDING CONTROL SYSTEM'),
('0354500', 'BOTTOM ASH GRINDING SYSTEM'),
('0354600', 'BOTTOM ASH GRINDING PLANT'),
('0355000', 'BOILER SYSTEM FROM SOLAR CELL'),
('0356100', 'SOLAR CELL MODULES & ACCESSORY'),
('0356200', 'INVERTER / CONVERTER & ACCESSARY'),
('0356300', 'BATTERY STORAGE'),
('0356400', 'SYSTEM CONTROLLER & DATA'),
('0356500', 'MOORING SYSTEM'),
('0356600', 'TRANSFORMER'),
('0356700', 'EARTHING AND LIGHTNING PROTECTION SYSTEMS'),
('0360100', 'BUILDING INNOVATION CENTER'),
('0360200', 'BUILDING INNOVATION - FIXTURE'),
('0360300', 'BUILDING INNOVATION - AIR CONDITIONING'),
('0360400', 'BUILDING INNOVATION - ELEVATOR'),
('0360700', 'BUILDING INNOVATION - FIRE PROTECTION SYSTEM'),
('0360B00', 'BUILDING INNOVATION - DOOR ACCESS CONTROL'),
('0360G00', 'BUILDING INNOVATION - POWER ALTERNATIVE ENERGY'),
('0360H00', 'BUILDING INNOVATION - ONLINE COMMUNICATION & CCTV'),
('0360I00', 'BUILDING INNOVATION - POWER MONITORING'),
('0370100', 'EV CHARGING STATION'),
('0370500', 'EV CHARGING STATION - ELECTRICAL SYSTEM'),
('0370H00', 'EV CHARGING STATION - ONLINE COMMUNICATION AND CCT'),
('0370I00', 'EV CHARGING STATION - POWER MONITORING'),
('0370J00', 'EV CHARGING STATION - SOLAR CELL'),
('0370K00', 'EV CHARGING STATION - DC CHARGER'),
('0370L00', 'EV CHARGING STATION - AC CHARGER'),
('0371100', 'CCTV - EV CHARGING (HEAD OFFICE)'),
('0391100', 'KIOS'),
('0391200', 'LAVATORY'),
('0391300', 'FLAG STAFF'),
('0391400', 'SIGN BOARD / BILLBOARD'),
('0391500', 'RETAINING WALL'),
('0391600', 'STATUE'),
('0391700', 'SURFACE AERATOR'),
('0391800', 'IMAGE/PLACE OF THE BUDDHA'),
('0391900', 'AGRICULTURE BUILDING'),
('0391A00', 'LIGHTING SMART GREENHOUSE'),
('0391B00', 'SMART GREENHOUSE - LIDAR SYSTEM'),
('0391C00', 'SMART GREENHOUSE - IOT&SENSOR SYSTEM'),
('0391D00', 'SMART GREENHOUSE - CENTELLA SEED PHYSICAL QUALITY'),
('0392100', 'STAND'),
('0392200', 'POOL'),
('0392300', 'POST OF TRAFFIC LIGHT'),
('0392400', 'SERVICE ELECTRONIC BANK'),
('0392500', 'WINDMILL'),
('0392600', 'HOUSING for DS-RMS'),
('0399900', 'OTHER FACILITIES'),
('0401100', 'HEAD OFFICE - BUILDING'),
('0401200', 'HEAD OFFICE - FIXTURE'),
('0401300', 'HEAD OFFICE - AIR CONDITIONING SYSTEM'),
('0401400', 'HEAD OFFICE - ELEVATOR'),
('0401500', 'HEAD OFFICE - ELECTRICAL SYSTEM'),
('0401600', 'HEAD OFFICE - WATER SUPPLY SYSTEM'),
('0401700', 'HEAD OFFICE - FIRE PROTECTION SYSTEM'),
('0401A00', 'HEAD OFFICE - INTERCOMMUNICATION SYSTEM'),
('0401B00', 'HEAD OFFICE - DOOR ACCESS CONTROL'),
('0401C00', 'HEAD OFFICE - AUTOMATIC CONTROL SYSTEM'),
('0401E00', 'HEAD OFFICE - SECURITY SYSTEM'),
('0401F00', 'HEAD OFFICE - WATER LEAK'),
('0401G00', 'HEAD OFFICE - TEMPERATURE & HUMIDITY RECORDER'),
('0401H00', 'HEAD OFFICE - ONLINE COMMUNICATION AND CCTV'),
('0401I00', 'HEAD OFFICE - POWER MONITORING'),
('0501000', 'SIMULATOR - EQUIPMENT'),
('0502000', 'SIMULATOR - MODEL'),
('0591000', 'SIMULATOR - BUILDING & SERVICES'),
('0601000', 'SIMULATOR - FOUNDATION (FENCE,GATE,CABLE,TRENCH)'),
('0602000', 'SIMULATOR - MISCELLANEOUS'),
('0603000', 'SIMULATOR - LOW VOLTAGE CONTROL AND POWER CABLE'),
('0604000', 'SIMULATOR - STATION SERVICE'),
('0605000', 'SIMULATOR - POWER FUSE'),
('0606000', 'SIMULATOR - AC/DC SUPPLY SYSTEM'),
('0607000', 'SIMULATOR - STATIONARY BATTERY AND BATTERY CHARGER'),
('0608000', 'SIMULATOR - CONTROL BOARD'),
('0609000', 'SIMULATOR - STATIC VAR SYSTEM'),
('0611000', 'SIMULATOR - ENERGY METER SYSTEM (BOARD)'),
('0612000', 'SIMULATOR - SCADA SYSTEM (SUB. CONTROL & DATA ACQ.)'),
('0613000', 'SIMULATOR - HVDC'),
('0614000', 'SIMULATOR - PROTECTIVE RELAY SYSTEM (BOARD)'),
('0615000', 'SIMULATOR - DIGITAL FAULT RECORDER SYSTEM (BOARD)'),
('0631000', 'SIMULATOR - SUBSTATION STEEL STRUCTURE'),
('0632000', 'SIMULATOR - POWER TRANSFORMER'),
('0633000', 'SIMULATOR - INSTRUMENT TRANSFORMER'),
('0634000', 'SIMULATOR - POWER CIRCUIT BREAKER'),
('0635000', 'SIMULATOR - DISCONNECTING SWITCH, AIR SWITCH'),
('0636000', 'SIMULATOR - SHUNT REACTOR'),
('0637000', 'SIMULATOR - GAS INSULATED SUBSTATION'),
('0638000', 'SIMULATOR - SHUNT CAPACITOR BANK'),
('0639000', 'SIMULATOR - SURGE ARRESTER'),
('0661000', 'SIMULATOR - TL-STEEL TOWER'),
('0662000', 'SIMULATOR - TL-CONDUCTOR'),
('0663000', 'SIMULATOR - TL-OHGW'),
('0664000', 'SIMULATOR - TL-INSULATOR'),
('0665000', 'SIMULATOR - TL-FOUNDATION'),
('0666000', 'SIMULATOR - TL-CONCRETE'),
('0691000', 'SIMULATOR - CONTROL BUILDING'),
('0701100', 'OFFSITE BACK UP - BUILDING'),
('0701300', 'OFFSITE BACK UP - AIR CONDITION SYSTEM'),
('0701500', 'OFFSITE BACK UP - ELECTRIC SYSTEM'),
('0701700', 'OFFSITE BACK UP - FIRE PROTECTION SYSTEM'),
('0701B00', 'OFFSITE BACK UP - DOOR ACCESS CONTROL'),
('0701E00', 'OFFSITE BACK UP - SECURITY SYSTEM'),
('0701F00', 'OFFSITE BACK UP - WATER LEAK'),
('0702000', 'MAINFRAME - MAIN CPU'),
('0703000', 'MAINFRAME - PERIPHERAL'),
('0704000', 'MINI - COMPUTER'),
('0705000', 'COMPUTER - COMMUNICATION SYSTEM'),
('0706000', 'COMPUTER - LOCAL AREA NETWORK COMM.'),
('0707000', 'COMPUTER - REMOTE AREA NETWORK COMM.'),
('0708000', 'COMPUTER - CABLE SYSTEM'),
('0710000', 'ERP Storage System'),
('0720000', 'EGAT Cloud Platform'),
('0730000', 'Data Center Infrastructure Management'),
('1001000', 'RESERVOIR'),
('1002000', 'MAIN DAM'),
('1003000', 'SPILL WAY'),
('1004000', 'APPROACH CHANNEL'),
('1005000', 'INTAKE'),
('1006000', 'PENSTOCK'),
('1007000', 'TAILRACE'),
('1008000', 'ROAD ON MAIN DAM'),
('1009000', 'LIGHTING ON MAIN DAM'),
('1011000', 'IRRIGATION OUTLET'),
('1012000', 'DIVERSION CHANNEL'),
('1013000', 'COFFER DAM'),
('1014000', 'FLOOD WARNING SYSTEM'),
('1015000', 'DAM INSTRUMENT'),
('1016000', 'TELEMETERING SYSTEM'),
('1016100', 'BUILDING OF TELEMETERING SYSTEM'),
('1016200', 'EQUIPMENT OF TELEMETERING SYSTEM'),
('1016300', 'SCADA FOR COMMUNICATION OF TELEMETERINGS'),
('1016400', 'DATA MANAGEMENT OF TELEMETERING SYSTEM'),
('1017100', 'SEISMOGRAPH'),
('1017200', 'ACCELEROGRAPH'),
('1111100', 'POWER HOUSE - BUILDING'),
('1111200', 'POWER HOUSE - FIXTURE');
('1121000', 'POWER HOUSE - STEEL STRUCTURE'),
('1131000', 'POWER HOUSE - HEAT VENTI. & AIR CONDITION'),
('1141000', 'POWER HOUSE - ELEVATORS'),
('1151000', 'POWER HOUSE - OVERHEAD CRANE, CRANE AND HOIST'),
('1161000', 'POWER HOUSE - AUXILIARY EQUIPMENT'),
('1171000', 'POWER HOUSE - INTERCOMMUNICATION SYSTEM'),
('1211000', 'BOILER SYSTEM'),
('1221000', 'BOILER - STEEL STRUCTURE'),
('1231000', 'BOILER - BOILER CONTROL SYSTEM'),
('1241000', 'PRECEPITATOR SYSTEM'),
('1251000', 'MAIN TRANSFORMER PRECEPITATOR'),
('1261000', 'PRECEPITATOR U3 TRANSFORMER'),
('1311000', 'TURBINE AND ACCESSORY'),
('1321000', 'GENERATOR & ACCESSORIES'),
('1331000', 'CONDENSING SYSTEM'),
('1411000', 'MAIN TRANSFORMER'),
('1421000', 'AUXILIARY TRANSFORMER'),
('1431000', 'RESERVE TRANSFORMER'),
('1441000', 'ELECTRICAL EQUIPMENT'),
('1451000', 'CONTROL & INFORMATION SYSTEM'),
('1511000', 'TURBINE & ACCESSORIES'),
('1521000', 'GENERATOR & ACCESSORIES'),
('1611000', 'GAS TURBINE'),
('1621000', 'GENERATOR'),
('1711000', 'PRIME MOVER & GENERATOR'),
('1811000', 'FUEL OIL STORAGE'),
('1821000', 'HANDLING SYSTEM'),
('1911000', 'FUEL GAS PIPING'),
('1921000', 'FUEL GAS REGULATING STATION'),
('1931000', 'GAS BOOSTER'),
('1941000', 'ELECTRONIC GAS REAL TIME MEASUREMENT'),
('2011000', 'FUEL TREATMENT - EQUIPMENT & FOUNDATION'),
('2021000', 'FUEL TREATMENT - OIL TANK'),
('2031000', 'FUEL TREATMENT - WATER TANK'),
('2041000', 'FUEL TREATMENT - BUILDING & SERVICES'),
('2111000', 'LIGNITE HANDLING - STRUCTURE & FOUNDATION'),
('2121000', 'LIGNITE HANDLING - STEEL STRUCTURE'),
('2131000', 'LIGNITE HANDLING - CONVEYOR FOUNDATION'),
('2141000', 'LIGNITE HANDLING - EQUIPMENT'),
('2151000', 'LIGNITE HANDLING - CONTROL INSTRUMENT.'),
('2211000', 'ASH HANDLING & DISP.- STRUCTURE & FOUNDATION'),
('2221000', 'ASH HANDLING & DISP.- EQUIPMENT'),
('2311000', 'RAW WATER SYSTEM - DAM'),
('2321000', 'RAW WATER SYSTEM - RESERVOIR'),
('2331000', 'RAW WATER SYSTEM - WATER PIPELINE/CANAL'),
('2341000', 'RAW WATER SYSTEM - PUMP/PUMP HOUSE'),
('2351000', 'RAW WATER SYSTEM - TUNNEL'),
('2411000', 'WATER TREATMENT - STEEL STRUCTURE'),
('2421000', 'WATER TREATMENT - TREATED WATER EQUIPMENT'),
('2431000', 'WATER TREATMENT - CONTROL & ELECTRI. EQUIPMENT'),
('2441000', 'WATER TREATMENT - BUILDING & SERVICES'),
('2511000', 'COOLING WATER SYS.-INTAKE STRUCTURE & EQUIPMENT'),
('2521000', 'COOLING WATER SYS.-COOLING TOWER'),
('2531000', 'COOLING WATER SYS.-CIRCULATING WATER SYSTEM'),
('2541000', 'COOLING WATER SYS.-PUMP HOUSE & OTHER STRUCTURE'),
('2551000', 'COOLING WATER SYS.-OUTFALL STRUCTURE'),
('2611000', 'F.G.D. EQUIPMENT'),
('2621100', 'F.G.D. BUILDING & SERVICES'),
('2711000', 'HYDROGEN & OXY. PLANT - EQUIPMENT'),
('2721100', 'HYDROGEN & OXY. PLANT - BUILDING & SERVICES'),
('2721200', 'BUILDING - FIXTURE'),
('2811000', 'SOLAR CELL'),
('2812000', 'OTHER SOLAR CELL EQUIPMENT'),
('2813000', 'CONTROL BUILDING'),
('2814000', 'BATTERY BUILDING'),
('2815000', 'BATTERY'),
('2911000', 'ELECTRICITY GENERATING EQUIPMENT AND CONTROL SYS.'),
('2912000', 'DISPATCHING ELECTRICITY EQUIPMENT'),
('2913000', 'FOUNDATION OF WIND TURBINE'),
('3199999', 'Design - Yearly Plan (Temporary)'),
('31AJ000', '20 (25) KV SYSTEMS'),
('31B0000', 'POWER TRANSMISSION AND AUXILIARY POWER SUPPLY'),
('31BA000', 'POWER TRANSMISSION'),
('31BAA00', 'GENERATOR LEADS'),
('31BAB00', 'FOUNDATION CABINETS'),
('31BAC00', 'GENERATOR CIRCUIT BREAKER, ALSO COMMUTATING POLE'),
('31BAT00', 'GENERATOR TRANSFORMERS, INCLUDING COOLING SYSTEM'),
('31BAU00', 'EARTHING AND LIGHTNING PROTECTION SYSTEMS'),
('31BAX00', 'CONTROL AIR SUPPLY SYSTEM'),
('31BAY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BB000', 'MEDIUM-VOLTAGE DISTRIBUTION BOARDS AND TRANSFORMER'),
('31BBA00', 'MV DISTRIBUTION BOARD, NORMAL SYSTEM'),
('31BBE00', 'MV DISTRIBUTION BOARD'),
('31BBF00', '6.6KV SWITCHGEAR FOR FGD.PLANT'),
('31BBT00', 'MV AUXILIARY POWER TRANSFORMERS'),
('31BBT01', 'UNIT AUXILIARY POWER TRANSFORMERS (UAT)'),
('31BBT02', 'STATION SERVICE POWER TRANSFORMER (SST)'),
('31BBX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31BBY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BC000', 'MEDIUM-VOLTAGE DISTRIBUTION BOARDS AND TRANSFORMER'),
('31BCA00', 'MV START-UP DISTRIBUTION BOARD'),
('31BCF00', '6.6KV FOR FGD PLANT'),
('31BCG00', 'MV.DISTR.FOR COMMON PLANT'),
('31BCH00', '6.6KV. FOR LIGNITE HANDLING'),
('31BCJ00', '6.6KV. FOR ASH DISPOSAL SYSTEM'),
('31BCT00', 'START-UP, OFFSITE, GENERAL-PURPOSE TRANSFORMERS'),
('31BCX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31BCY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BD000', 'MEDIUM-VOLTAGE EMERGENCY DISTRIBUTION BOARDS ETC.'),
('31BDA00', 'MV EMERGENCY DISTRIBUTION BOARD'),
('31BDT00', 'MV TRANSFORMATOR'),
('31BDX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31BDY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BF000', 'LOW-VOLTAGE MAIN DISTRIBUTION BOARDS - NORMAL SYS.'),
('31BFA00', '400V MAIN DISTRIBUTION C BUS FROM BA&BB'),
('31BFC00', 'LOW-VOLTAGE MAIN DISTRIBUTION - CABLE'),
('31BFE00', 'LOW-VOLTAGE SWITCHGEARS, MAIN DISTRIBUTION BOARDS'),
('31BFF00', '400V MAIN DISTRIBUTION C BUS FROM BM&BN'),
('31BFL00', 'LOW-VOLTAGE MAIN DISTRIBUTION - LIGHTING'),
('31BFR00', 'LOW-VOLTAGE MAIN DISTRIBUTION - RACEWAY'),
('31BFT00', '400V DISTRIBUTION TRANSFORMER'),
('31BH000', 'LOW-VOLTAGE MAIN DISTRIBUTION BOARDS - GENERAL'),
('31BHA00', 'LV MAIN DISTRIBUTION BOARD'),
('31BHF00', '400V MDB. FOR FGD PLANT'),
('31BHG00', '400 V.MDB. LOW VOLTAGE SYSTEM'),
('31BHH00', '380V.MDB.FOR LIGNITE HANDING.'),
('31BHT00', 'LV AUXILIARY POWER TRANSFORMER'),
('31BHX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31BHY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BJ000', 'LOW-VOLTAGE SUBDISTRIBUTION BOARDS AND TRANSFORMER'),
('31BJA00', 'LV DISTRIBUTION BOARD (D BUS)'),
('31BJF00', 'LV DISTRIBUTION BOARD (D BUS)'),
('31BK000', 'LOW-VOLTAGE DISTRIBUTION BOARDS AND TRANSFORMERS'),
('31BKA00', 'LV DISTRIBUTION BOARD'),
('31BKT00', 'LV AUXILIARY POWER TRANSFORMER'),
('31BKX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31BKY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BL000', 'LOW-VOLTAGE DISTRIBUTION BOARDS - EMERGENCY'),
('31BLA00', 'LV.DISTRIBUTION BOARD (D BUS FROM CC,CD)'),
('31BLF00', 'LV DISTRIBUTION BOARD (D BUS)'),
('31BLG00', 'LOW VOLTAGE SUB DISTRIBUTION BOARD'),
('31BLH00', '380V.MCC.FOR LIGNITE HANDING'),
('31BLJ00', 'LV.SUB.DIST.FOR ASH DISPOSAL SYSTEM'),
('31BLR00', 'LV.DISTRIBUTION BOARDS FOR V&AC.'),
('31BLS00', 'LIGHTING SUBDISTRIBUTION BOARD'),
('31BM000', 'LOW-VOLTAGE DISTRIBUTION BOARDS - EMERGENCY'),
('31BMA00', 'LOW VOLTAGE EMERGENCY DISTRIBUTION BOARD'),
('31BMB00', 'LOW VOLTAGE EMERGENCY DISTRIBUTION BOARD'),
('31BMC00', 'LOW VOLTAGE EMERGENCY DISTRIBUTION BOARD'),
('31BMF00', 'LV.DISTRIBUTION BOARDS,(DIESEL)EMERGENCY'),
('31BN000', 'MAIN BREAKER'),
('31BR000', 'LOW-VOLTAGE DISTRIBUTION BOARDS, UNINTERRUPTIBLE'),
('31BRA00', 'LV DISTRIBUTION BOARD, UNINTERRUPTIBLE (CONVERTER)'),
('31BRF00', 'UPS.(CONVERTER) FOR FGD PLANT'),
('31BRS00', 'CONVERTER (UPS) DC TO DC'),
('31BRT00', 'CONVERTER (ROTARY)'),
('31BRU00', 'CONVERTER (STATIC), INVERTER'),
('31BRV00', 'EMERGENCY POWER GENERATING EQUIPMENT'),
('31BRX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31BRY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BT000', 'BATTERY SYSTEMS- INVERTER & CHARGER'),
('31BTA00', 'BATTERY SYSTEMS- STATION BATTERIES'),
('31BTB00', 'BATTERY SYSTEMS- INVERTER'),
('31BTG00', '125 VDC. STORAGE BATTERIES'),
('31BTK00', 'BATTERY 24V.'),
('31BTL00', 'BATTERY SYSTEMS- CHARGER'),
('31BTM00', 'RECTIFIER, BATTERY CHARGER 220VDC'),
('31BTN00', 'RECTIFIER, BATTERY CHARGER'),
('31BTU00', 'DC TO DC CONVERTER'),
('31BTV00', '125 VDC. BATTERY CHARGER'),
('31BTW00', 'COMMON EQUIPMENT'),
('31BU000', 'C DISTRIBUTION BOARDS, NORMAL SYSTEM'),
('31BUA00', 'DC DISTRIBUTION BOARD'),
('31BUC00', '220 VDC. MAIN DISTRIBUTION BOARD'),
('31BUD00', '220 VDC. MAIN DISTRIBUTION BOARD'),
('31BUM00', '24 VDC. MAIN DISTRIBUTION BOARD'),
('31BUN00', '24 VDC. MAIN DISTRIBUTION BOARD'),
('31BUX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31BUY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BVC00', '220 VDC. SUB-DISTRIBUTION BOARD'),
('31BVD00', '220 VDC. SUB-DISTRIBUTION BOARD'),
('31BVM00', '24 VDC. SUB-DISTRIBUTION BOARD'),
('31BVN00', '24 VDC. SUB-DISTRIBUTION BOARD'),
('31BY000', 'CONTROL AND PROTECTION EQUIPMENT'),
('31BYB00', 'PLANT CONTROL, MONITORING, SCADA & PLC ETC.'),
('31BYN00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31C0000', 'INSTRUMENTATION AND CONTROL EQUIPMENT'),
('31C0100', 'CONTROL & INFORMATION SYSTEM'),
('31C0200', 'COMMUNICATION EQUIPMENT'),
('31C0300', 'CONTINUOUS EMISSION MONITORING SYSTEMS'),
('31CAA00', 'CABINET FOR PROTECTIVE INTERLOCKS'),
('31CBA00', 'CABINET FOR FUNCTIONAL GROUP CONTROL'),
('31CDA00', 'CONTROL SYSTEM'),
('31CEA00', 'ANNUNCIATION SYSTEM'),
('31CFA00', 'CABINET FOR MEASUREMENT AND RECORDER'),
('31CFB00', 'MEASUREMENT'),
('31CFQ00', 'REVENUE METER SYSTEM'),
('31CGA00', 'CLOSE-LOOP CONTROL'),
('31CGB00', 'CLOSED-LOOP CONTROL'),
('31CHA00', 'RSV AUX XFMR RELAY PROTECTION'),
('31CJA00', 'SCADA'),
('31CJB00', 'ELECTRICAL COLLECTOR SYSTEM SCADA'),
('31CJD00', 'START-UP CONTROL, SETPOINT CONTROL'),
('31CKA00', 'PROCESS COMPUTER SYSTEM'),
('31CNA00', 'ENERGY MANAGEMENT SYSTEM (Hydro & Solar Hybrid)'),
('31CPF00', 'CONTROL SYSTEM FOR FGD PLANT'),
('31CPH00', 'CONTROL FOR LIGNITE HANDLING SYSTEM'),
('31CPJ00', 'CONTROL SYSTEM FOR ASH HANDLING SYSTEM'),
('31CRU00', 'OPERATION AND MONITORING'),
('31CY000', 'COMMUNICATION AND INFORMATION SYSTEM'),
('31CYE00', 'FIRE DETECTION AND ALARM SYSTEM'),
('31CYJ00', 'REMOTE METERING SYSTEM'),
('31CYP00', 'CLOSED CIRCUIT TELEVISION SYSTEM (CCTV)'),
('31E0000', 'CONVENTIONAL FUEL SUPPLY AND RESIDUES DISPOSAL'),
('31EAE00', 'DISTRIBUTION BUNKER'),
('31EBA00', 'TRANSPORT SYSTEM'),
('31EBC00', 'CRUSHING SYSTEM'),
('31EBD00', 'SCREENING SYSTEM'),
('31EBE00', 'SEPARATOR SYSTEM AND DISCHARGE EQUIPMENT'),
('31EBR00', 'RESIDUES REMOVAL SYSTEM'),
('31EBU00', 'SAMPLING EQUIPMENT'),
('31EC000', 'LIGNITE HANDLING SYSTEM'),
('31ECA00', 'LIGNITE MAIN CONVEYOR'),
('31ECB00', 'LIGNITE BRANCH CONVEYOR'),
('31ECC00', 'BOILER BUNKER CONVEYOR'),
('31ECY00', 'COAL HANDLING CONTROL SYSTEM'),
('31EG000', 'SUPPLY OF LIQUID FUELS (LIGHT FUEL OIL)'),
('31EGA00', 'RECEIVING EQUIPMENT INCL. PIPELINE'),
('31EGB00', 'TANK FARM'),
('31EGC00', 'PUMP SYSTEM'),
('31EGD00', 'PIPING SYSTEM'),
('31EGR00', 'RESIDUES REMOVAL SYSTEM'),
('31EGT00', 'HEATING MEDIUM SYSTEM'),
('31EGY00', 'CONTROL SYSTEM'),
('31EH000', 'CHEMICAL TREATMENT OF LIQUID FUELS INCL. RESIDUES'),
('31EK000', 'SUPPLY OF GASEOUS FUELS'),
('31EKA00', 'RECEIVING EQUIPMENT INCL. PIPELINE'),
('31EKB00', 'MOISTURE SEPARATION SYSTEM'),
('31EKC00', 'HEATING SYSTEM'),
('31EKD00', 'MAIN REDUCING STATION, EXPANSION TURBINE'),
('31EKE00', 'MECHANICAL CLEANING, SCRUBBING'),
('31EKF00', 'STORAGE SYSTEM'),
('31EKG00', 'PIPING SYSTEM'),
('31EKH00', 'MAIN PRESSURE BOOSTING SYSTEM'),
('31EKR00', 'RESIDUES REMOVAL SYSTEM'),
('31EKT00', 'FUEL GAS PREHEATING SYSTEM'),
('31EKU00', 'BILLING METER STATION'),
('31EKX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31EKY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31EN000', 'SUPPLY OF OTHER FUELS - HEAVY FUEL OIL OR CRUDE OIL'),
('31ENA00', 'RECEIVING EQUIPMENT INCL. PIPELINE'),
('31ENB00', 'TANK FARM'),
('31ENC00', 'PUMP SYSTEM'),
('31END00', 'PIPING SYSTEM'),
('31ENR00', 'RESIDUES REMOVAL SYSTEM'),
('31ENT00', 'HEATING MEDIUM SYSTEM'),
('31ENX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31ENY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31EP000', 'TREATMENT OF OTHER FUELS (PHYSICAL TREATMENT)'),
('31EPC00', 'ADDITIVE DOSING SYSTEM'),
('31EPG00', 'PHYSICAL TREATMENT OF LIGHT FUEL OIL'),
('31EPN00', 'PHYSICAL TREATMENT OF HEAVY FUEL OIL'),
('31EPT00', 'HEATING MEDIUM SYSTEM'),
('31EPX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31EPY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31ETA00', 'WET ASH CONVEYING SYSTEM'),
('31ETB00', 'STORAGE OR SETTLING POND FOR WET ASH'),
('31ETG00', 'CONVEYING SYSTEM FOR DRY ASH'),
('31ETH00', 'STORAGE SYSTEM FOR DRY ASH'),
('31ETK00', 'COMMON CONVEYOR SYSTEM FOR WET & DRY ASH'),
('31ETY00', 'ASH AND SLAG REMOVAL CONTROL SYSTEM'),
('31G0000', 'WATER SUPPLY AND DISPOSAL'),
('31GA000', 'RAW WATER SUPPLY'),
('31GAA00', 'EXTRACTION, MECHANICAL CLEANING'),
('31GAC00', 'PIPING AND CHANNEL SYSTEM'),
('31GAD00', 'STORAGE SYSTEM'),
('31GAF00', 'PUMP SYSTEM'),
('31GAX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31GAY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31GB000', 'TREATMENT SYSTEM (CARBONATE HARDNESS REMOVAL)'),
('31GBB00', 'FILTERING, MECHANICAL CLEANING SYSTEM'),
('31GBD00', 'PRECIPITATION SYSTEM'),
('31GBE00', 'ACID PROPORTIONING SYSTEM'),
('31GBK00', 'PIPING SYSTEM, STORAGE SYSTEM'),
('31GBN00', 'CHEMICALS SUPPLY SYSTEM'),
('31GBP00', 'REGENERATION, FLUSHING EQUIPMENT'),
('31GBQ00', 'POLYPHOSPHATE FEED SYSTEM'),
('31GBS00', 'SLUDGE THICKENING SYSTEM'),
('31GBY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31GC000', 'TREATMENT SYSTEM (DEMINERALIZATION)'),
('31GC100', 'EQUIPMENT'),
('31GC200', 'CONTROL SYSTEM (PLC/DCS)'),
('31GC300', 'INSTRUMENTATION FOR WTP'),
('31GCE00', 'ACID PROPORTIONING SYSTEM'),
('31GCK00', 'PUMP AND PIPING SYSTEM'),
('31GCL00', 'DEMIN WATER SUPPLY TANK'),
('31GCN00', 'CHEMICALS SUPPLY SYSTEM'),
('31GCY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31GD000', 'TREATMENT SYSTEM (DISTRICT HEATING WATER)'),
('31GDC00', 'AERATION, GAS INJECTION SYSTEM'),
('31GDD00', 'PRECIPITATOR SYSTEM'),
('31GDE00', 'ACID PROPORTIONING SYSTEM'),
('31GDS00', 'SLUDGE THICKENING SYSTEM'),
('31GH000', 'DISTRIBUTION SYSTEMS (NOT DRINKING WATER)'),
('31GHA00', 'SERVICE WATER DISTRIBUTION SYSTEM'),
('31GHC00', 'DEMINERALIZATION DISTRIBUTION SYSTEM'),
('31GHE00', 'DISTRIBUTION SYSTEMS'),
('31GHH00', 'DISTRIBUTION SYSTEM'),
('31GK000', 'POTABLE WATER SUPPLY'),
('31GM000', 'PLANT DRAINAGE SYSTEM'),
('31GMQ00', 'WASTE WATER DISCHARGE SYSTEM (ZQ-1)'),
('31GN000', 'PLANT DRAINS TREATMENT SYSTEM'),
('31GNE00', 'ACID PROPORTIONING FOR DRAIN SYSTEM'),
('31GNK00', 'PIPING SYSTEM, TEMPORARY STORAGE & PUMP SYS'),
('31GNY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31GQ000', 'DOMESTIC WASTE WATER COLLECTION AND DRAINAGE SYS.'),
('31GQH00', 'WASTE WATER COLLECTION & DRAINAGE SYSTEM'),
('31GR000', 'DOMESTIC WASTE WATER TREATMENT SYSTEM'),
('31GTK00', 'WATER RECOVERY FROM WASTE WATER'),
('31GU000', 'RAINWATER COLLECTION AND DRAINAGE SYSTEMS'),
('31GV000', 'LUBRICANT SUPPLY SYSTEM'),
('31H0000', 'CONVENTIONAL HEAT GENERATION'),
('31HA000', 'HEAT RECOVERY STEAM GENERATION (HRSG) SYSTEM'),
('31HAA00', 'LP PART-FLOW FEED HEATING SYSTEM (FLUE-GAS-HEATED)'),
('31HAB00', 'HP PART-FLOW FEED HEATING SYSTEM (FLUE-GAS-HEATED)'),
('31HAC00', 'ECONOMIZER SYSTEM'),
('31HAC01', 'LP. ECONOMIZER I&O HDR.'),
('31HAC02', '1RY. IP. ECONOMIZER I&O HDR.'),
('31HAC03', '2RY. IP. ECONOMIZER I&O HDR.'),
('31HAC04', '1RY. HP. ECONOMIZER I&O HDR.'),
('31HAC05', '2RY. HP. ECONOMIZER I&O HDR.'),
('31HAC06', '3RY. HP. ECONOMIZER I&O HDR.'),
('31HAD00', 'EVAPORATOR SYSTEM'),
('31HAD01', 'LP. EVAPORATOR I&O HDR.1'),
('31HAD02', 'LP. EVAPORATOR I&O HDR.2'),
('31HAD03', 'IP. EVAPORATOR I&O HDR.'),
('31HAD04', 'HP. EVAPORATOR I&O HDR.'),
('31HAG00', 'CIRCULATION SYSTEM'),
('31HAG01', 'LP. DRUM & COMPONENTS'),
('31HAG02', 'IP. DRUM & COMPONENTS'),
('31HAG03', 'HP. DRUM & COMPONENTS'),
('31HAH00', 'HP SUPERHEATER SYSTEM'),
('31HAH01', 'LP. SUPER HEATER I&O HDR.'),
('31HAH02', 'IP. SUPER HEATER I&O HDR.'),
('31HAH03', '1RY HP. SUPER HEATER I&O HDR.'),
('31HAH04', '2RY HP. SUPER HEATER I&O HDR.'),
('31HAJ00', 'REHEAT SYSTEM'),
('31HAJ01', 'IP. PRIMARY REHEAT I&O HDR.'),
('31HAK00', 'SECONDARY REHEAT SYSTEM'),
('31HAK01', 'IP. SECONDARY REHEAT I&O HDR.'),
('31HAN00', 'PRESSURE SYSTEM DRAINAGE AND VENTING SYSTEMS'),
('31HAX00', 'FLUID SUPPLY SYSTEM FOR CONTROL AND PROTECTION EQ.'),
('31HAY00', 'CONTROL AND PROTECTION EQUIPMENT'),
('31HB000', 'SUPPORT STRUCTURE, ENCLOSURE, STEAM GENERATOR INTE'),
('31HC000', 'FIRESIDE HEAT TRANSFER SURFACE CLEANING EQUIPMENT'),
('31HCB00', 'STEAM SOOT BLOWING SYSTEM'),
('31HCC00', 'WATER SOOTBLOWING SYSTEM'),
('31HCY00', 'SURFACE CLEANING CONTROL SYSTEM'),
('31HD000', 'ASH AND SLAG REMOVAL, PARTICULATE REMOVAL'),
('31HF000', 'PULVERIZER SYSTEM');
