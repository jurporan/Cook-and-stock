class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here
    user ||= User.new # guest user (not logged in)
    if user.has_role?(:admin)
      can :read, :all
      can :manage, User do |un_user|
        !un_user.has_role?(:admin) ||
            un_user.id==user.id
      end
      can :voir_roles, User
    end
    if user.has_role?(:utilisateur)
      can :read, :all
    end
  end
end
