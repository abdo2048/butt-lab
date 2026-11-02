# Skill: Theoretical Simulation

When spec parameters are unknown, bound them with first principles:

1. MASS BALANCE — conservation per stream: butt composition (~36% CA fiber,
   ~54% tobacco/paper, ~10% ash/moisture, <1% toxins). Every kg must appear
   in an output.
2. DIFFUSION — extraction times scale t ~ L^2/D. Fiber fluffing reduces
   path length L; state assumed D and particle size.
3. SOLUBILITY — Hansen solubility parameters: CA (Dd 17.1, Dp 13.1, Dh 10.6)
   vs candidate solvents. Solvents close to toxins but far from CA are
   selective extractors (d-limonene, scCO2). Water removes nicotine but not
   PAHs/tar.
4. THERMODYNAMICS — CO2 critical point 31 C / 73.85 bar; subcritical liquid
   CO2 cheaper hardware but weaker extraction; scCO2 weak for polar
   compounds without co-solvent; heavy metals need chelation, never fluid
   extraction.
5. ENERGY — rough kWh/tonne per heating step (Q = m*c*dT) + equipment class.
6. ECONOMICS — ranges with LOW/HIGH scenarios. Never single-point margins.

Output format: parameter | estimate | bounds | reasoning | confidence label.
Simulation results are [MY-ESTIMATE] by definition — label them.
