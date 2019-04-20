let
  flush = import ./src/flush.nix;
in
[
  flush
]

++ import ./conductor/build.nix
++ import ./darwin/build.nix
++ import ./git/build.nix
++ import ./node/build.nix
++ import ./openssl/build.nix
++ import ./release/build.nix
++ import ./rust/build.nix